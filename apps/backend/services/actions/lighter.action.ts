import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";
import type { TradingMetadata } from "../../../../packages/common/metaData";

const LIGHTER_MAINNET_URL = "https://mainnet.zklighter.elliot.ai";
const LIGHTER_TESTNET_URL = "https://testnet.zklighter.elliot.ai";

interface LighterCredentials {
    privateKey?: string;      
    accountIndex?: string;    
    apiKeyIndex?: string;     
    useTestnet?: string;      
    [key: string]: string | undefined;
}

interface OrderBookResponse {
    order_books: Array<{
        market_id: number;
        symbol: string;
        base_decimals: number;
        quote_decimals: number;
    }>;
}

interface OrderBookDetailsResponse {
    order_book_details: Array<{
        last_trade_price: number;
        best_bid_price: number;
        best_ask_price: number;
        size_decimals?: number;
        price_decimals?: number;
    }>;
}

interface NonceResponse {
    nonce: number;
}

export class LighterAction implements IAction {
    private maxRetries = 3;
    private retryDelay = 1000;

    async execute(credentials: ActionCredentials, metadata: ActionMetadata): Promise<ActionResult> {
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
            try {
                return await this.executeInternal(credentials as LighterCredentials, metadata as TradingMetadata);
            } catch (error) {
                if (attempt === this.maxRetries - 1) {
                    return {
                        success: false,
                        error: error instanceof Error ? error.message : 'Lighter action failed'
                    };
                }
                await this.sleep(this.retryDelay * (attempt + 1));
            }
        }
        return { success: false, error: 'Max retries exceeded' };
    }

    private async executeInternal(
        credentials: LighterCredentials, 
        metadata: TradingMetadata
    ): Promise<ActionResult> {
        const { privateKey, accountIndex = '0', apiKeyIndex = '3', useTestnet = 'false' } = credentials;
        const { type, qty, symbol } = metadata;

        if (!privateKey) {
            return { success: false, error: 'Missing privateKey in credentials' };
        }

        const baseUrl = useTestnet === 'true' ? LIGHTER_TESTNET_URL : LIGHTER_MAINNET_URL;
        const accountIdx = parseInt(accountIndex, 10);
        const apiKeyIdx = parseInt(apiKeyIndex, 10);

        if (isNaN(accountIdx) || accountIdx < 0) {
            return { success: false, error: `Invalid accountIndex: ${accountIndex}` };
        }
        if (isNaN(apiKeyIdx) || apiKeyIdx < 0) {
            return { success: false, error: `Invalid apiKeyIndex: ${apiKeyIndex}` };
        }

        try {
            // Fetch order books
            const orderBooksResponse = await this.fetchWithTimeout(
                `${baseUrl}/api/v1/orderBooks`, 10000
            );
            const marketsData = await orderBooksResponse.json() as OrderBookResponse;

            const market = marketsData.order_books.find(m => m.symbol === symbol);
            if (!market) {
                return { success: false, error: `Market ${symbol} not found on Lighter` };
            }

            // Fetch market details
            const detailsResponse = await this.fetchWithTimeout(
                `${baseUrl}/api/v1/orderBookDetails?market_id=${market.market_id}`, 10000
            );
            const marketDetails = await detailsResponse.json() as OrderBookDetailsResponse;
            const details = marketDetails.order_book_details[0];

            // Get price (fallback to Binance for testnet)
            let currentPrice = details?.last_trade_price || details?.best_bid_price || details?.best_ask_price;
            if (!currentPrice || currentPrice === 0) {
                currentPrice = await this.fetchLivePrice(symbol);
            }

            // Fetch nonce
            const nonceResponse = await this.fetchWithTimeout(
                `${baseUrl}/api/v1/nextNonce?account_index=${accountIdx}&api_key_index=${apiKeyIdx}`, 10000
            );
            const { nonce } = await nonceResponse.json() as NonceResponse;

            // Prepare order params
            const isAsk = type === 'SHORT';
            const clientOrderIndex = Date.now() % 1000000;
            const sizeDecimals = details?.size_decimals || 5;
            const priceDecimals = details?.price_decimals || 1;
            const baseAmount = Math.floor(qty * Math.pow(10, sizeDecimals));
            const priceInUnits = Math.floor(currentPrice * Math.pow(10, priceDecimals));

            // Sign order in subprocess to avoid FFI blocking
            const signerPayload = JSON.stringify({
                baseUrl, privateKey, apiKeyIdx, accountIdx,
                marketId: market.market_id, clientOrderIndex, baseAmount,
                price: priceInUnits, isAsk,
                orderType: 0, timeInForce: 0, nonce
            });

            const signerScript = new URL('./lighter-signer.ts', import.meta.url).pathname;
            const signResult = await this.runSignerSubprocess(signerScript, signerPayload);

            if (!signResult.success || !signResult.txInfo) {
                return { success: false, error: `Signing failed: ${signResult.error}` };
            }

            // Submit transaction via curl
            const submitResult = await this.submitTransaction(baseUrl, signResult.txType!, signResult.txInfo);

            if (!submitResult.success) {
                return { success: false, error: submitResult.error };
            }

            return {
                success: true,
                data: {
                    platform: 'lighter',
                    action: type,
                    symbol,
                    quantity: qty,
                    marketId: market.market_id,
                    price: currentPrice,
                    executed: true,
                    timestamp: new Date().toISOString(),
                }
            };
        } catch (error) {
            throw error;
        }
    }

    private async fetchWithTimeout(url: string, timeout: number): Promise<Response> {
        const response = await Promise.race([
            fetch(url),
            new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error(`Request timed out: ${url}`)), timeout)
            )
        ]);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.statusText}`);
        }
        return response;
    }

    private async runSignerSubprocess(script: string, payload: string): Promise<{
        success: boolean; txType?: number; txInfo?: string; signature?: string; error?: string;
    }> {
        const proc = Bun.spawn(['bun', script, payload], {
            stdout: 'pipe',
            stderr: 'pipe',
            cwd: new URL('.', import.meta.url).pathname
        });

        const timeoutPromise = new Promise<string>((_, reject) => {
            setTimeout(() => reject(new Error('Signer subprocess timed out')), 30000);
        });

        try {
            const output = await Promise.race([
                new Response(proc.stdout).text(),
                timeoutPromise
            ]);
            await proc.exited;
            return JSON.parse(output.trim());
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    }

    private async submitTransaction(baseUrl: string, txType: number, txInfo: string): Promise<{
        success: boolean; error?: string;
    }> {
        const curlCmd = `curl -s -X POST "${baseUrl}/api/v1/sendTx" -H "Content-Type: application/x-www-form-urlencoded" -d "tx_type=${txType}&tx_info=${encodeURIComponent(txInfo)}"`;
        
        const proc = Bun.spawn(['bash', '-c', curlCmd], {
            stdout: 'pipe',
            stderr: 'pipe'
        });

        const output = await new Response(proc.stdout).text();
        const exitCode = await proc.exited;

        if (exitCode !== 0 || !output) {
            return { success: false, error: `Transaction submission failed` };
        }

        try {
            const result = JSON.parse(output) as { code: number; message?: string };
            if (result.code === 200) {
                return { success: true };
            }
            return { success: false, error: result.message || `Failed with code ${result.code}` };
        } catch {
            return { success: false, error: `Invalid response: ${output}` };
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async fetchLivePrice(symbol: string): Promise<number> {
        const binanceSymbols: Record<string, string> = {
            'BTC': 'BTCUSDT', 'ETH': 'ETHUSDT', 'SOL': 'SOLUSDT', 'LIT': 'LITUSDT',
        };
        
        const binanceSymbol = binanceSymbols[symbol];
        if (!binanceSymbol) return 100;

        try {
            const response = await this.fetchWithTimeout(
                `https://api.binance.com/api/v3/ticker/price?symbol=${binanceSymbol}`, 5000
            );
            const data = await response.json() as { price: string };
            return parseFloat(data.price);
        } catch {
            const defaults: Record<string, number> = { 'BTC': 95000, 'ETH': 3500, 'SOL': 200, 'LIT': 1 };
            return defaults[symbol] || 100;
        }
    }
}
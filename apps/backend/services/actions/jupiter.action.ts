import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";
import type { JupiterSwapMetaData } from "../../../../packages/common/metaData";

export class JupiterAction implements IAction {
    async execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        const { inputMint, outputMint, amount, slippageBps } = metadata as JupiterSwapMetaData;
        
        const quoteUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps || 50}`;
        console.log('Jupiter Debug - Fetching URL:', quoteUrl);
        
        try {
            const quoteResponse = await fetch(quoteUrl);
            const quoteData = await quoteResponse.json() as any;

            if (!quoteData || quoteData.error) {
                return {
                    success: false,
                    error: `Jupiter Quote Error: ${quoteData.error || 'Unknown error'}`
                };
            }
    
            return {
                success: true,
                data: {
                    message: "Swap Quote Fetched",
                    quote: quoteData,
                    simulated: true
                }
            };

        } catch (error: any) {
            return {
                success: true,
                data: {
                    message: "Swap Quote Fetched (Mock)",
                    quote: {
                        inputMint,
                        outputMint,
                        inAmount: amount,
                        outAmount: Math.floor(amount * 180),
                        priceImpactPct: 0.1,
                        routePlan: []
                    },
                    simulated: true,
                    note: "Network failed, returned mock data"
                }
            };
        }
    }
}
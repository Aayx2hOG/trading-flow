import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";

export class HyperliquidAction implements IAction {
    private maxRetries = 3;
    private retryDelayMs = 1000;

    async execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            try {
                return await this.execute(credentials, metadata, inputData);
            } catch (e) {
                if (attempt === this.maxRetries - 1) {
                    return {
                        success: false,
                        error: e instanceof Error ? e.message : 'Hyperliquid action failed'
                    };
                }
                await this.sleep(this.retryDelayMs * (attempt + 1));
            }
        }
        return {
            success: false,
            error: 'Hyperliquid action failed after maximum retries'
        };
    }

    private async executeInternal(credentials: ActionCredentials, metaData: ActionMetadata, inputData?: any): Promise<ActionResult> {
        const { privateKey } = credentials;
        const { action, symbol, quantity, leverage } = metaData as any;

        return {
            success: true,
            data: {
                platform: 'Hyperliquid',
                action,
                symbol,
                quantity,
                leverage,
                executed: true,
                timestamp: new Date().toISOString(),
            }
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
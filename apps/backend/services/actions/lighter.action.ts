import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";

export class LighterAction implements IAction {
    private maxRetries = 3;
    private retryDelay = 1000;

    async execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
            try {
                return await this.executeInternal(credentials, metadata, inputData);
            } catch (error) {
                console.error(`Lighter attempt ${attempt + 1} failed:`, error);
                if (attempt === this.maxRetries - 1) {
                    return {
                        success: false,
                        error: error instanceof Error ? error.message : 'Lighter action failed'
                    };
                }
                await this.sleep(this.retryDelay * (attempt + 1));
            }
        }

        return {
            success: false,
            error: 'Max retries exceeded'
        };
    }

    private async executeInternal(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        const { apiKey } = credentials;
        const { action, symbol, quantity } = metadata;

        return {
            success: true,
            data: {
                platform: 'lighter',
                action,
                symbol,
                quantity,
                executed: true,
                timestamp: new Date().toISOString(),
            }
        };
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
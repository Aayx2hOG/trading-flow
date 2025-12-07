import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";

export class BackpackAction implements IAction {
    async execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        try {
            const { privateKey } = credentials;
            const { action, symbol, quantity, price } = metadata;

            return {
                success: true,
                data: {
                    platform: 'backpack',
                    action,
                    symbol,
                    quantity,
                    price,
                    executed: true
                }
            }
        } catch (e) {
            return {
                success: false,
                error: e instanceof Error ? e.message : 'Unknown error'
            }
        }
    }
}
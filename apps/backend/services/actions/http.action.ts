import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";

export class HttpAction implements IAction {
    async execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        try {
            const { url, method = "GET", headers = {}, body } = metadata;
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined
            });
            const data = await response.json();
            return {
                success: response.ok,
                data,
                error: response.ok ? undefined : `HTTP ${response.status}`
            };
        } catch (e) {
            return {
                success: false,
                error: e instanceof Error ? e.message : 'Unknown error'
            }
        }
    }
}
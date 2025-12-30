import type { ActionCredentials, ActionMetadata, ActionResult, IAction } from "../../../../packages/common/types";

export class ConditionAction implements IAction {
    async execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult> {
        const {leftValue, operator, rightValue} = metadata;
        
        // Validate inputs
        if (!operator || leftValue === undefined || rightValue === undefined) {
            return {
                success: false,
                error: 'Missing required condition parameters'
            };
        }

        const resolve = (val: any): any => {
            if (typeof val === 'string' && val.startsWith('{{') && val.endsWith('}}')) {
                const key = val.slice(2, -2);
                return inputData?.data?.[key] ?? inputData?.[key] ?? val;
            }
            return val;
        };
        
        const left = resolve(leftValue);
        const right = resolve(rightValue);

        let isMatch = false;
        switch(operator){
            case '===': isMatch = left === right; break;
            case '!==': isMatch = left !== right; break;
            case '!=': isMatch = left != right; break;
            case '<': isMatch = left < right; break;
            case '>': isMatch = left > right; break;
            case '<=': isMatch = left <= right; break;
            case '>=': isMatch = left >= right; break;
            default:
                return {
                    success: false,
                    error: `Invalid operator: ${operator}`
                };
        }
        
        return {
            success: isMatch,
            data: {
                conditionMet: isMatch,
                compared: `${left} ${operator} ${right}`,
            },
            error: isMatch ? undefined : `Condition not met: ${left} ${operator} ${right}`
        };
    }
}
import { Handle, Position } from "@xyflow/react";
import type { WebhookTriggerMetaData } from "common/types";

export function WebhookTrigger({
    data
}: {
    data: {
        metaData: WebhookTriggerMetaData
    },
    isConnectable: boolean,
}) {
    return (
        <div className="bg-white rounded-lg shadow border border-gray-300 p-3 min-w-[160px]">
            <div className="mb-2 pb-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 text-xs">Webhook Trigger</h3>
            </div>
            <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-medium text-gray-900">{data.metaData.method || 'POST'}</span>
                </div>
                <div className="text-[10px] text-gray-500">
                    Triggers on HTTP request
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="!bg-gray-400 !w-2.5 !h-2.5"
            />
        </div>
    );
}
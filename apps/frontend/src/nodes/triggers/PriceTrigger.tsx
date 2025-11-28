import { Handle, Position } from "@xyflow/react";
import type { PriceTriggerMetaData } from "common/types";

export function PriceTrigger({ data }: {
    data: {
        metaData: PriceTriggerMetaData
    },
    isConnectable: boolean,
}) {
    return <div className="bg-white rounded-lg shadow border border-gray-300 p-3 min-w-[160px]">
        <div className="mb-2 pb-2 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-xs">Price Trigger</h3>
        </div>
        <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
                <span className="text-gray-600">Asset:</span>
                <span className="font-medium text-gray-900">{data.metaData.asset}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-gray-900">${data.metaData.price.toLocaleString()}</span>
            </div>
        </div>
        <Handle type="source" position={Position.Right} className="!bg-gray-400 !w-2.5 !h-2.5" />
    </div>
}
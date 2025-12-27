import { Handle, Position } from "@xyflow/react";
import type { PriceTriggerMetaData } from "common/types";

export function PriceTrigger({ data }: {
    data: {
        metaData: PriceTriggerMetaData
    },
    isConnectable: boolean,
}) {
    return <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg border-2 border-blue-500 p-3 min-w-[180px]">
        <div className="mb-2 pb-2 border-b border-blue-400/30">
            <h3 className="font-semibold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                Price Trigger
            </h3>
        </div>
        <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
                <span className="text-blue-100">Asset:</span>
                <span className="font-medium text-white">{data.metaData.asset}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-blue-100">Price:</span>
                <span className="font-medium text-white">${data.metaData.price.toLocaleString()}</span>
            </div>
        </div>
        <Handle type="source" position={Position.Right} className="!bg-blue-300 !w-3 !h-3 !border-2 !border-blue-600" />
    </div>
}
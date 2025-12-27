import { Handle, Position } from "@xyflow/react";
import type { TimerNodeMetaData } from "common/types";

export function TimerTrigger({ data }: {
    data: {
        metaData: TimerNodeMetaData
    },
    isConnectable: boolean,
}) {
    const minutes = Math.floor(data.metaData.time / 60);
    const seconds = data.metaData.time % 60;
    const timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    return <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg border-2 border-purple-500 p-3 min-w-[180px]">
        <div className="mb-2 pb-2 border-b border-purple-400/30">
            <h3 className="font-semibold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse"></span>
                Timer Trigger
            </h3>
        </div>
        <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
                <span className="text-purple-100">Interval:</span>
                <span className="font-medium text-white">{timeDisplay}</span>
            </div>
            <div className="text-[10px] text-purple-200">
                Runs every {data.metaData.time}s
            </div>
        </div>
        <Handle type="source" position={Position.Right} className="!bg-purple-300 !w-3 !h-3 !border-2 !border-purple-600" />
    </div>
}
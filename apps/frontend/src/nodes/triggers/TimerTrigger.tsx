import { Handle, Position } from "@xyflow/react";

export type TimerNodeMetaData = {
    time: number;
};

export function TimerTrigger({ data }: {
    data: {
        metaData: TimerNodeMetaData
    },
    isConnectable: boolean,
}) {
    const minutes = Math.floor(data.metaData.time / 60);
    const seconds = data.metaData.time % 60;
    const timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    return <div className="bg-white rounded-lg shadow border border-gray-300 p-3 min-w-[160px]">
        <div className="mb-2 pb-2 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-xs">Timer Trigger</h3>
        </div>
        <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
                <span className="text-gray-600">Interval:</span>
                <span className="font-medium text-gray-900">{timeDisplay}</span>
            </div>
            <div className="text-[10px] text-gray-500">
                Runs every {data.metaData.time}s
            </div>
        </div>
        <Handle type="source" position={Position.Right} className="!bg-gray-400 !w-2.5 !h-2.5" />
    </div>
}
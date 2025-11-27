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
    return <div className="p-4 border">
        Every {data.metaData.time / 3600} seconds
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}
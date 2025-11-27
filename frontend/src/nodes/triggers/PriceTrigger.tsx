import { Handle, Position } from "@xyflow/react";

export type PriceTriggerMetaData = {
    asset: string,
    price: number,
};

export function PriceTrigger({ data }: {
    data: {
        metaData: PriceTriggerMetaData
    },
    isConnectable: boolean,
}) {
    return <div className="p-4 border">
        {data.metaData.asset}
        {data.metaData.price}
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}
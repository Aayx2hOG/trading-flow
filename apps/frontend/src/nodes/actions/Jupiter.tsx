import { Handle, Position } from "@xyflow/react";
import type { JupiterSwapMetaData } from "common/types";
import { NodeWrapper } from "@/components/NodeWrapper";

export function Jupiter({ id, data }: { id: string; data: { metaData: JupiterSwapMetaData }}) {
    return (
        <NodeWrapper nodeId={id}>
        <div className="glass bg-card/40 border-white/5 rounded-2xl p-4 min-w-[200px] hover:border-primary/30 transition-all duration-300 shadow-xl shadow-black/20">
            <div className="mb-3 pb-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                    Jupiter Swap
                </h3>
            </div>
            <div className="space-y-2 text-xs">
                 <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Input</span>
                    <span className="font-bold text-foreground truncate max-w-[100px]">{data.metaData.inputMint}</span>
                </div>
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Output</span>
                    <span className="font-bold text-foreground truncate max-w-[100px]">{data.metaData.outputMint}</span>
                </div>
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Amount</span>
                    <span className="font-bold text-foreground">{data.metaData.amount}</span>
                </div>
            </div>
            <Handle 
                type="source" 
                position={Position.Right} 
                className="!bg-primary/80 !w-3.5 !h-3.5 !border-4 !border-background hover:!scale-125 transition-transform" 
            />
            <Handle 
                type="target" 
                position={Position.Left} 
                className="!bg-primary/80 !w-3.5 !h-3.5 !border-4 !border-background hover:!scale-125 transition-transform" 
            />
        </div>
        </NodeWrapper>
    );
}
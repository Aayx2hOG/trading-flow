import { Handle, Position } from "@xyflow/react";
import type { PriceTriggerMetaData } from "common/types";

export function PriceTrigger({ data }: { data: { metaData: PriceTriggerMetaData }}) {
    return (
        <div className="glass bg-card/40 border-blue-500/20 rounded-2xl p-4 min-w-[200px] hover:border-blue-500/40 transition-all duration-300 shadow-xl shadow-blue-500/5">
            <div className="mb-3 pb-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
                    Price Trigger
                </h3>
            </div>
            <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Asset</span>
                    <span className="font-bold text-foreground bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">{data.metaData.asset}</span>
                </div>
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Target Price</span>
                    <span className="font-bold text-blue-400 text-sm tracking-tight">${data.metaData.price.toLocaleString()}</span>
                </div>
            </div>
            <Handle 
                type="source" 
                position={Position.Right} 
                className="!bg-blue-500 !w-3.5 !h-3.5 !border-4 !border-background hover:!scale-125 transition-transform" 
            />
        </div>
    );
}
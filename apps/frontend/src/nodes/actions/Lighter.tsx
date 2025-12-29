import { Handle, Position } from "@xyflow/react";
import type { TradingMetadata } from "common/types";

export function Lighter({ data }: { data: { metaData: TradingMetadata }}) {
    const isLong = data.metaData.type === 'LONG';
    return (
        <div className="glass bg-card/40 border-white/5 rounded-2xl p-4 min-w-[200px] hover:border-primary/30 transition-all duration-300 shadow-xl shadow-black/20">
            <div className="mb-3 pb-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                    Lighter
                </h3>
            </div>
            <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Position</span>
                    <span className={`font-bold px-2 py-0.5 rounded-md border ${isLong ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                        {data.metaData.type}
                    </span>
                </div>
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Symbol</span>
                    <span className="font-bold text-foreground">{data.metaData.symbol}</span>
                </div>
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Quantity</span>
                    <span className="font-bold text-foreground">{data.metaData.qty}</span>
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
    );
}
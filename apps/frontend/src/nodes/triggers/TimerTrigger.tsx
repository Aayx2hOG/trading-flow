import { Handle, Position } from "@xyflow/react";
import type { TimerNodeMetaData } from "common/types";
import { NodeWrapper } from "@/components/NodeWrapper";

export function TimerTrigger({ id, data }: { id: string; data: { metaData: TimerNodeMetaData }}) {
    const minutes = Math.floor(data.metaData.time / 60);
    const seconds = data.metaData.time % 60;
    const timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    return (
        <NodeWrapper nodeId={id}>
        <div className="glass bg-card/40 border-purple-500/20 rounded-2xl p-4 min-w-[200px] hover:border-purple-500/40 transition-all duration-300 shadow-xl shadow-purple-500/5">
            <div className="mb-3 pb-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"></div>
                    Timer Trigger
                </h3>
            </div>
            <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Interval</span>
                    <span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">{timeDisplay}</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic">
                    Runs every {data.metaData.time}s
                </p>
            </div>
            <Handle 
                type="source" 
                position={Position.Right} 
                className="!bg-purple-500 !w-3.5 !h-3.5 !border-4 !border-background hover:!scale-125 transition-transform" 
            />
        </div>
        </NodeWrapper>
    );
}
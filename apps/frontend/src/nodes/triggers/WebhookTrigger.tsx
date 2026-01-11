import { Handle, Position } from "@xyflow/react";
import type { WebhookTriggerMetaData } from "common/types";
import { NodeWrapper } from "@/components/NodeWrapper";

export function WebhookTrigger({ id, data }: { id: string; data: { metaData: WebhookTriggerMetaData }}) {
    return (
        <NodeWrapper nodeId={id}>
        <div className="glass bg-card/40 border-green-500/20 rounded-2xl p-4 min-w-[200px] hover:border-green-500/40 transition-all duration-300 shadow-xl shadow-green-500/5">
            <div className="mb-3 pb-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></div>
                    Webhook Trigger
                </h3>
            </div>
            <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Method</span>
                    <span className="font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">{data.metaData.method || 'POST'}</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic">
                    Triggers on HTTP incoming request
                </p>
            </div>
            <Handle 
                type="source" 
                position={Position.Right} 
                className="!bg-green-500 !w-3.5 !h-3.5 !border-4 !border-background hover:!scale-125 transition-transform" 
            />
        </div>
        </NodeWrapper>
    );
}
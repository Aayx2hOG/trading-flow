import { useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";

interface NodeWrapperProps {
    nodeId: string;
    children: React.ReactNode;
    className?: string;
}

export function NodeWrapper({ nodeId, children, className = "" }: NodeWrapperProps) {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
        setEdges((edges) => edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    };

    return (
        <div className={`relative group ${className}`}>
            <button
                onClick={handleDelete}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                title="Delete node"
            >
                <X className="w-3 h-3" />
            </button>
            {children}
        </div>
    );
}

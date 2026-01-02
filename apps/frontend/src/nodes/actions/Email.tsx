import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import { memo } from 'react';

export interface EmailMetaData {
    to: string;
    subject: string;
    body: string;
    credentialRefId?: string;
}

export const Email = memo(({ data, selected }: NodeProps) => {
    const metaData = data.metaData as EmailMetaData;

    return (
        <div className="relative group">
            <Handle
                type="target"
                position={Position.Left}
                className="!bg-blue-500 !w-4 !h-4 !border-4 !border-gray-900 transition-all group-hover:!scale-125"
            />
            
            <Card className={`w-[300px] bg-gray-900/90 border-2 transition-all duration-300 shadow-xl backdrop-blur-xl ${
                selected 
                    ? 'border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] scale-105' 
                    : 'border-gray-700 hover:border-gray-600 hover:scale-[1.02]'
            }`}>
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-500/10 to-transparent">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-500/20 rounded-xl ring-1 ring-blue-500/40 shadow-lg shadow-blue-500/10">
                                <Mail className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <CardTitle className="text-sm font-bold text-gray-100 tracking-wide">
                                    Send Email
                                </CardTitle>
                                <div className="text-[10px] text-blue-400 font-medium uppercase tracking-wider mt-0.5">
                                    Action
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                
                <CardContent className="space-y-4 pt-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-2.5 bg-gray-950/50 rounded-lg border border-gray-800">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">To</span>
                            <div className="flex items-center gap-1.5 max-w-[180px]">
                                <span className="text-xs font-bold text-gray-300 truncate">
                                    {metaData?.to || 'Not set'}
                                </span>
                            </div>
                        </div>

                        {metaData?.subject && (
                            <div className="p-2.5 bg-gray-950/50 rounded-lg border border-gray-800 space-y-1.5">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Subject</span>
                                <p className="text-xs text-gray-400 italic line-clamp-1 border-l-2 border-gray-700 pl-2">
                                    "{metaData.subject}"
                                </p>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-2 pt-1">
                            <Badge variant="outline" className={`text-[10px] px-2 py-0.5 border-gray-700 ${metaData?.credentialRefId ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                {metaData?.credentialRefId ? 'Authenticated' : 'No Credentials'}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Handle
                type="source"
                position={Position.Right}
                className="!bg-blue-500 !w-4 !h-4 !border-4 !border-gray-900 transition-all group-hover:!scale-125"
            />
        </div>
    );
});

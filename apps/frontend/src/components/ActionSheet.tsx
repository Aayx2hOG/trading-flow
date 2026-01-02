import type { NodeKind, NodeMetaData } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SUPPORTED_ASSETS } from "./TriggerSheet";
import { http } from "@/lib/http";

const SUPPORTED_ACTIONS = [{
    id: 'hyperliquid',
    title: 'Hyperliquid',
    description: 'Place a trade on Hyperliquid',
}, {
    id: 'lighter',
    title: 'Lighter',
    description: 'Place a trade on lighter'
}, {
    id: 'backpack',
    title: 'Backpack',
    description: 'Place a trade on Backpack'
}, {
    id: 'condition',
    title: 'Condition',
    description: 'Add a logic gate to your workflow'
}, {
    id: 'email',
    title: 'Email',
    description: 'Send an email notification'
}]

export const ActionSheet = ({
    onSelect,
    onClose,
    initialType,
    initialMetaData
}: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
    onClose: () => void
    initialType?: NodeKind
    initialMetaData?: NodeMetaData
}) => {
    const [metaData, setMetaData] = useState<NodeMetaData | {}>(initialMetaData || {});
    const [selectedAction, setSelectedAction] = useState<NodeKind>(initialType || SUPPORTED_ACTIONS[0].id as NodeKind);
    const [credentials, setCredentials] = useState<{id: string, name: string, type: string}[]>([]);

    useEffect(() => {
        http.get<{id: string, name: string, type: string}[]>('/credentials').then((creds) => {
            setCredentials(creds.filter(c => c.type === 'email'));
        });
    }, []);

    return <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="sm:max-w-[500px]">
            <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Select Action</SheetTitle>
                <SheetDescription className="text-base">
                    Choose the action or logic node to add
                </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6 px-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Action Type</label>
                    <Select value={selectedAction} onValueChange={(value) => {
                        const newKind = value as NodeKind;
                        setSelectedAction(newKind);
                        if (newKind === 'condition') {
                            setMetaData({ leftValue: '{{currentPrice}}', operator: '>', rightValue: '' });
                        } else {
                            setMetaData({});
                        }
                    }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an action" />
                        </SelectTrigger>
                        <SelectContent className="**:data-radix-select-viewport:pl-2">
                            <SelectGroup>
                                {SUPPORTED_ACTIONS.map(({ id, title }) =>
                                    <SelectItem key={id} value={id}>
                                        {title}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {selectedAction === 'condition' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Left Value (e.g., {"{{currentPrice}}"})</label>
                            <Input
                                placeholder="{{currentPrice}}"
                                value={(metaData as any).leftValue || ''}
                                onChange={(e) => setMetaData({ ...metaData, leftValue: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Operator</label>
                            <Select value={(metaData as any).operator || ''} onValueChange={(value) => setMetaData({ ...metaData, operator: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select operator" />
                                </SelectTrigger>
                                <SelectContent className="**:data-radix-select-viewport:pl-2">
                                    <SelectItem value=">">Greater Than (&gt;)</SelectItem>
                                    <SelectItem value="<">Less Than (&lt;)</SelectItem>
                                    <SelectItem value="===">Equals (===)</SelectItem>
                                    <SelectItem value="!=">Not Equals (!=)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Right Value (e.g., 150)</label>
                            <Input
                                placeholder="150"
                                value={(metaData as any).rightValue || ''}
                                onChange={(e) => setMetaData({ ...metaData, rightValue: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                    {selectedAction === 'email' && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Credentials</label>
                                <Select
                                    value={(metaData as any).credentialRefId || ''}
                                    onValueChange={(val) => setMetaData({ ...metaData, credentialRefId: val })}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select credentials" />
                                    </SelectTrigger>
                                    <SelectContent className="**:data-radix-select-viewport:pl-2">
                                        <SelectGroup>
                                            {credentials.map(c => (
                                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {credentials.length === 0 && (
                                    <p className="text-xs text-orange-500">No email credentials found. Add one in Credentials page first.</p>
                                )}
                            </div>
                            <Input
                                placeholder="Recipient email"
                                value={(metaData as any).to || ''}
                                onChange={(e) => setMetaData({ ...metaData, to: e.target.value })}
                            />
                            <Input
                                placeholder="Subject: Price Alert for {{asset}}"
                                value={(metaData as any).subject || ''}
                                onChange={(e) => setMetaData({ ...metaData, subject: e.target.value })}
                            />
                            <Textarea
                                placeholder="Body: {{asset}} is now at ${{currentPrice}}"
                                value={(metaData as any).body || ''}
                                onChange={(e) => setMetaData({ ...metaData, body: e.target.value })}
                            />
                        </div>
                    )}

                {(selectedAction === 'hyperliquid' || selectedAction === 'lighter' || selectedAction === 'backpack') &&
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Position Type</label>
                            <Select value={(metaData as any).type || ''} onValueChange={(value) => setMetaData(metaData => ({
                                ...metaData,
                                type: value
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select position type" />
                                </SelectTrigger>
                                <SelectContent className="**:data-radix-select-viewport:pl-2">
                                    <SelectGroup>
                                        <SelectItem value={'LONG'}>
                                            <span className="font-medium">LONG</span>
                                        </SelectItem>
                                        <SelectItem value={'SHORT'}>
                                            <span className="font-medium">SHORT</span>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Symbol</label>
                            <Select value={(metaData as any).symbol || ''} onValueChange={(value) => setMetaData(metaData => ({
                                ...metaData,
                                symbol: value
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a symbol" />
                                </SelectTrigger>
                                <SelectContent className="**:data-radix-select-viewport:pl-2">
                                    <SelectGroup>
                                        {SUPPORTED_ASSETS.map(asset =>
                                            <SelectItem key={asset} value={asset}>
                                                {asset}
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Quantity</label>
                            <Input
                                type="number"
                                placeholder="e.g., 0.5"
                                className="w-full"
                                value={(metaData as any).qty || ''}
                                onChange={(e) => setMetaData(metaData => ({
                                    ...metaData,
                                    qty: Number(e.target.value)
                                }))}
                            />
                            <p className="text-xs text-gray-500">Amount to trade in selected symbol</p>
                        </div>
                    </div>
                }
            </div>
            <SheetFooter className="pt-6">
                <Button
                    type='submit'
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-6"
                    onClick={() => { onSelect(selectedAction, metaData as NodeMetaData) }}
                >
                    Add {selectedAction === 'condition' ? 'Condition' : 'Action'}
                </Button>
            </SheetFooter>
        </SheetContent >
    </Sheet >
}
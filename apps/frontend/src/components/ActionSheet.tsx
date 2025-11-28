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
import { useState } from "react";
import { Input } from "./ui/input";
import type { TradingMetadata } from "@/nodes/actions/Lighter";

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
}]
const SUPPORTED_ASSETS = ['SOL', 'BTC', 'ETH'];

export const ActionSheet = ({
    onSelect,
    onClose
}: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
    onClose: () => void
}) => {
    const [metaData, setMetaData] = useState<TradingMetadata | {}>({});
    const [selectedAction, setSelectedAction] = useState<NodeKind>(SUPPORTED_ACTIONS[0].id as NodeKind);

    return <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="sm:max-w-[500px]">
            <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Select Action</SheetTitle>
                <SheetDescription className="text-base">
                    Choose the trading action to execute
                </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6 px-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Exchange</label>
                    <Select value={selectedAction} onValueChange={(value) => setSelectedAction(value as NodeKind)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an action" />
                        </SelectTrigger>
                        <SelectContent className="[&_[data-radix-select-viewport]]:pl-2">
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
                {(selectedAction === 'hyperliquid' || selectedAction === 'lighter' || selectedAction === 'backpack') &&
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Position Type</label>
                            <Select value={'type' in metaData ? metaData.type : ''} onValueChange={(value) => setMetaData(metaData => ({
                                ...metaData,
                                type: value
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select position type" />
                                </SelectTrigger>
                                <SelectContent className="[&_[data-radix-select-viewport]]:pl-2">
                                    <SelectGroup>
                                        <SelectItem value={'long'}>
                                            <span className="font-medium">LONG</span>
                                        </SelectItem>
                                        <SelectItem value={'short'}>
                                            <span className="font-medium">SHORT</span>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Symbol</label>
                            <Select value={'symbol' in metaData ? metaData.symbol : ''} onValueChange={(value) => setMetaData(metaData => ({
                                ...metaData,
                                symbol: value
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a symbol" />
                                </SelectTrigger>
                                <SelectContent className="[&_[data-radix-select-viewport]]:pl-2">
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
                                value={'qty' in metaData ? metaData.qty : ''}
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
                    Create Action
                </Button>
            </SheetFooter>
        </SheetContent >
    </Sheet >
}
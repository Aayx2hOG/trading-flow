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
import type { PriceTriggerMetaData, TimerNodeMetaData } from "common/types";

const SUPPORTED_TRIGGERS = [{
    id: 'timer-trigger',
    title: 'Timer',
    description: 'Run this trigger every x seconds/minutes',
}, {
    id: 'price-trigger',
    title: 'Price Trigger',
    description: 'Runs whenever the price goes above or below a certain number for an asset'
},
{
    id: 'webhook-trigger',
    title: 'Webhook Trigger',
    description: 'Trigger workflow via an HTTP request'
}]
export const SUPPORTED_ASSETS = ['SOL', 'BTC', 'ETH'];

export const TriggerSheet = ({
    onSelect,
    onClose
}: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
    onClose: () => void
}) => {
    const [metaData, setMetaData] = useState<PriceTriggerMetaData | TimerNodeMetaData>({
        time: 3600
    });
    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind>(SUPPORTED_TRIGGERS[0].id as NodeKind);
    return <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="sm:max-w-[500px]">
            <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Select Trigger</SheetTitle>
                <SheetDescription className="text-base">
                    Choose the event that will start your workflow
                </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6 px-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Trigger Type</label>
                    <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value as NodeKind)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent className="**:data-radix-select-viewport:pl-2">
                            <SelectGroup>
                                {SUPPORTED_TRIGGERS.map(({ id, title }) =>
                                    <SelectItem key={id} value={id}>
                                        {title}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {selectedTrigger === 'timer-trigger' &&
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Interval (seconds)</label>
                        <Input
                            type="number"
                            placeholder="e.g., 3600"
                            className="w-full"
                            value={'time' in metaData ? metaData.time : ''}
                            onChange={(e) => setMetaData({
                                time: Number(e.target.value)
                            })}
                        />
                        <p className="text-xs text-gray-500">Workflow will run every {('time' in metaData && metaData.time) ? `${metaData.time} seconds` : 'X seconds'}</p>
                    </div>
                }
                {selectedTrigger === 'price-trigger' &&
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Asset</label>
                            <Select value={'asset' in metaData ? metaData.asset : ''} onValueChange={(value) => setMetaData(metaData => ({
                                ...metaData,
                                asset: value
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an asset" />
                                </SelectTrigger>
                                <SelectContent className="**:data-radix-select-viewport:pl-2">
                                    <SelectGroup>
                                        {SUPPORTED_ASSETS.map((id) =>
                                            <SelectItem key={id} value={id}>{id}</SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Target Price</label>
                            <Input
                                type="number"
                                placeholder="e.g., 50000"
                                className="w-full"
                                onChange={(e) => setMetaData(m => ({
                                    ...m,
                                    price: Number(e.target.value)
                                }))}
                            />
                            <p className="text-xs text-gray-500">Trigger when price crosses this threshold</p>
                        </div>
                    </div>
                }
            </div>
            <SheetFooter className="pt-6">
                <Button
                    type='submit'
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-6"
                    onClick={() => { onSelect(selectedTrigger, metaData) }}
                >
                    Create Trigger
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet >
}
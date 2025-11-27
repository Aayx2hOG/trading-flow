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
import type { PriceTriggerMetaData } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetaData } from "@/nodes/triggers/TimerTrigger";
import { useState } from "react";
import { Input } from "./ui/input";

const SUPPORTED_TRIGGERS = [{
    id: 'timer-trigger',
    title: 'Timer',
    description: 'Run this trigger every x seconds/minutes',
}, {
    id: 'price-trigger',
    title: 'Price Trigger',
    description: 'Runs whenever the price goes above or below a certain number for an asset'
}]
const SUPPORTED_ASSETS = ['SOL', 'BTC', 'ETH'];

export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
}) => {
    const [metaData, setMetaData] = useState<PriceTriggerMetaData | TimerNodeMetaData>({
        time: 3600
    });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return <Sheet open={true}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select Trigger</SheetTitle>
                <SheetDescription>
                    Select the type of trigger you need
                    <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SUPPORTED_TRIGGERS.map(({ id, title }) =>
                                    <>
                                        <SelectItem key={id} value={id}>{title}</SelectItem >
                                        {/* <SelectLabel>{description}</SelectLabel> */}
                                    </>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {selectedTrigger === 'timer-trigger' &&
                        <div>
                            Number of seconds after which to run the timer
                            <Input value={metaData.time} onChange={(e) => setMetaData(metaData => ({
                                ...metaData,
                                time: Number(e.target.value)
                            }))}></Input>
                        </div>
                    }
                    {selectedTrigger === 'price-trigger' &&
                        <div>
                            Price:
                            <Input type="text" onChange={(e) => setMetaData(m => ({
                                ...m,
                                price: Number(e.target.value)
                            }))} />
                            <Select value={metaData.asset} onValueChange={(value) => setMetaData(metaData => ({
                                ...metaData,
                                asset: value
                            }))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select an asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {SUPPORTED_ASSETS.map((id) =>
                                            <>
                                                <SelectItem key={id} value={id}>{id}</SelectItem >
                                            </>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    }
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <Button type='submit' onClick={() => { onSelect(selectedTrigger, metaData) }}>Create Trigger</Button>
            </SheetFooter>
        </SheetContent>
    </Sheet >
}
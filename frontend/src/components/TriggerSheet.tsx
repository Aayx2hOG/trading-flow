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

const SUPPORTED_TRIGGERS = [{
    id: 'timer',
    title: 'Timer',
    description: 'Run this trigger every x seconds/minutes',
}, {
    id: 'price-trigger',
    title: 'Price Trigger',
    description: 'Runs whenever the price goes above or below a certain number for an asset'
}]

export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
}) => {
    const [metaData, setMetaData] = useState({});
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return <Sheet open={true}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select Trigger</SheetTitle>
                <SheetDescription>
                    Select the type of trigger you need
                    <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a flow" />
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
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <Button type='submit' onClick={() => { onSelect(selectedTrigger, metaData) }}>Create Trigger</Button>
            </SheetFooter>
        </SheetContent>
    </Sheet >
}
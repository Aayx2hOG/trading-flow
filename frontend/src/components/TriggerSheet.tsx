import type { NodeKind, NodeMetaData } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";

const SUPPORTED_TRIGGERS = [{
    id: 'timer',
    title: 'timer',
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
    return <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select Trigger</SheetTitle>
                <SheetDescription>
                    Select the type of trigger you need
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SUPPORTED_TRIGGERS.map(({ id, title }) =>
                                    <>
                                        <SelectLabel>{title}</SelectLabel>
                                        <SelectItem onSelect={() => onSelect(
                                            id,
                                            metaData
                                        )} value={id}>{title}</SelectItem >
                                    </>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </SheetDescription>
            </SheetHeader>

            <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet >
}
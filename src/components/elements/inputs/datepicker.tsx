"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

interface Props {
    date: Date | undefined;
    setDate: (date: Date) => void;
    initialDate?: Date;
}

export function DatePicker({ initialDate, date, setDate }: Props) {
    const [stringDate, setStringDate] = useState(
        initialDate ? format(initialDate, "PPP") : ""
    );
    const [errorMessage, setErrorMessage] = useState<string>("");

    // console.log(format(initialDate, "PPP"), date);

    return (
        <Popover key={date instanceof Date ? date.getDate() : "no-date"}>
            <div className="relative rounded-lg">
                <input
                    type="string"
                    value={stringDate}
                    onFocus={() => {
                        if (date) setStringDate(format(date, "MM/dd/yyyy"));
                    }}
                    onChange={(e) => {
                        if (date) setStringDate("");
                        setStringDate(e.target.value);
                    }}
                    onBlur={(e) => {
                        let parsedDate = new Date(e.target.value);
                        if (parsedDate.toString() === "Invalid Date") {
                            setErrorMessage("Invalid Date");
                        } else {
                            setErrorMessage("");
                            setDate(parsedDate);
                            setStringDate(format(parsedDate, "PPP"));
                        }
                    }}
                    className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                />
                {errorMessage !== "" && (
                    <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
                        {errorMessage}
                    </div>
                )}
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <span className="material-symbols-outlined ms-1 !leading-none !text-xl me-1 hover:no-underline">
                            calendar_month
                        </span>
                    </Button>
                </PopoverTrigger>
            </div>
            <PopoverContent align="end" className="w-auto p-0">
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    defaultMonth={date}
                    onSelect={(selectedDate) => {
                        if (!selectedDate) return;
                        setDate(selectedDate);
                        setStringDate(format(selectedDate, "PPP"));
                        setErrorMessage("");
                    }}
                    fromYear={1960}
                    toYear={2030}
                    classNames={{
                        caption_label: "flex items-center text-sm font-medium",
                        dropdown: "rdp-dropdown bg-card",
                        dropdown_icon: "ml-2",
                        dropdown_year: "rdp-dropdown_year ml-3",
                        button: "",
                        button_reset: "",
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}

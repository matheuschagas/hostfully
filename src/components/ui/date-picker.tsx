import * as React from "react";
import {eachDayOfInterval, format, isBefore, isSameDay} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {DateRange, Matcher, SelectRangeEventHandler} from "react-day-picker";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {useMemo} from "react";

export function DatePickerWithRange({
                                      className,
                                      startDate,
                                      endDate,
                                      handleDateChange,
                                      disabledDays
                                    }: {
  className?: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  handleDateChange: (date: DateRange) => void;
  disabledDays?: Date[];
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  const isDisabledDayInRange = (selectedDate: DateRange, disableds: Date[] | undefined) => {
    if (!selectedDate || !disableds) return;
    if(!selectedDate.from || !selectedDate.to) return;
    const daysInRange = eachDayOfInterval({
      start: selectedDate.from,
      end: selectedDate.to,
    });
    for (const day of daysInRange) {
      for(const disabled of disableds) {
        if(isSameDay(day, disabled)) return true;
      }
    }
  }

  const handleSelect: SelectRangeEventHandler = (selectedDate) => {
    if (!selectedDate) return;
    if(!selectedDate.from && !selectedDate.to) return;
    if(selectedDate.from && !selectedDate.to) return setDate({...selectedDate, to: undefined});
    if(isDisabledDayInRange(selectedDate, disabledDays)) return setDate(undefined);

    // Check if the selected start date is before today
    if (selectedDate.from && isBefore(selectedDate.from, new Date())) {
      selectedDate.from = new Date();
    }

    // Check if the selected end date is before today
    if (selectedDate.to && isBefore(selectedDate.to, new Date())) {
      selectedDate.to = new Date();
    }

    // Update state and call the parent handler
    handleDateChange(selectedDate);
    setDate(selectedDate);
  };

  const disabled = useMemo(() => {
    let disabled: Matcher | Matcher[] | undefined = [{before: new Date()}];
    if (disabledDays) disabled = [...disabled, ...disabledDays];
    return disabled;
  }, [disabledDays])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={disabled} // Disable days before today
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
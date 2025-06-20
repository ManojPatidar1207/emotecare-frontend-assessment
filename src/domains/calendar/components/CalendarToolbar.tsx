import { forwardRef, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type FullCalendar from "@fullcalendar/react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCalendarStore } from "@/domains/calendar/store";
import { useCalendarNavigation } from "@/domains/calendar/hooks";
import { getToolbarDateLabel } from "@/domains/calendar/utils";
import { viewOptions } from "@/domains/calendar/constants";
import type { CalendarViewTypes } from "@/domains/calendar/types";

export const CalendarToolbar = forwardRef<
  FullCalendar,
  Record<string, unknown>
>((_props, ref) => {
  const { currentView, currentViewDateRange, openCreateEventDialog } =
    useCalendarStore();
  const { handleNavigate, handleViewChange } = useCalendarNavigation(
    ref as RefObject<FullCalendar>
  );

  return (
    <div className="flex items-center justify-between w-full py-3 px-4 max-sm:flex-col max-sm:gap-2 max-sm:items-start">
      <div className="flex items-center gap-3 max-sm:w-full">
        <Button variant="outline" onClick={() => handleNavigate("today")}>
          Today
        </Button>

        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Previous"
            onClick={() => handleNavigate("prev")}
          >
            <ChevronLeft height={24} width={24} />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            aria-label="Next"
            onClick={() => handleNavigate("next")}
          >
            <ChevronRight height={24} width={24} />
          </Button>
        </div>

        <span className="font-medium text-gray-800 dark:text-gray-100 text-lg max-sm:text-base max-sm:flex-grow max-sm:text-end">
          {getToolbarDateLabel(
            currentView,
            currentViewDateRange.start,
            currentViewDateRange.end
          )}
        </span>
      </div>

      <div className="flex items-center gap-2 max-sm:w-full max-sm:grid max-sm:grid-cols-2">
        <Button onClick={() => openCreateEventDialog()}>Create Event</Button>

        <Select
          onValueChange={(value) =>
            handleViewChange(value as CalendarViewTypes)
          }
          value={currentView}
        >
          <SelectTrigger className="w-32 cursor-pointer hover:bg-gray-50 hover:border-gray-200 bg-white rounded-full text-center pl-4 max-sm:w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
            {viewOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});

CalendarToolbar.displayName = "CalendarToolbar";

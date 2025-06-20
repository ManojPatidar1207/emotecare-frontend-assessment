import dayjs from "dayjs";
import type {
  DayCellContentArg,
  DayHeaderContentArg,
  SlotLabelContentArg,
  EventContentArg,
} from "@fullcalendar/core";

import { cn } from "@/utils";
import { getGmtTime, isEventAllDayByTime } from "@/domains/calendar/utils";

/**
 * ----------- dayGridMonth -----------
 */
export const renderDayGridMonthDayCellContent = (
  renderProps: DayCellContentArg
) => {
  const day = dayjs(renderProps.date);
  const dateNumber = day.date();
  const isFirstOfMonth = dateNumber === 1;

  return isFirstOfMonth ? `${day.format("MMM")} ${dateNumber}` : dateNumber;
};

export const renderDayGridMonthEventContent = (
  renderProps: EventContentArg
) => {
  const event = renderProps.event;
  const start = dayjs(event.extendedProps.originalStartDate);
  const isAllDay = isEventAllDayByTime(
    new Date(event.extendedProps.originalStartDate),
    new Date(event.extendedProps.originalEndDate)
  );

  return (
    <div className="px-1.5 py-0.5 flex items-center gap-1 text-xs truncate">
      {!isAllDay && (
        <>
          <span className="flex-shrink-0 h-1.5 w-1.5 bg-white rounded-full" />
          <span>{start.format("h:mm A")}</span>
        </>
      )}
      <span className="truncate font-medium">{event.title}</span>
    </div>
  );
};

/**
 *  ----------- timeGridWeek -----------
 */
export const renderTimeGridWeekDayHeaderContent = (
  renderProps: DayHeaderContentArg
) => {
  const date = dayjs(renderProps.date);
  const isToday = date.isSame(dayjs(), "day");

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={cn("text-[11px] font-medium text-gray-500 uppercase", {
          "text-blue-600": isToday,
        })}
      >
        {date.format("ddd")}
      </span>
      <span
        className={cn(
          "h-11 w-11 flex items-center justify-center text-2xl font-normal text-gray-800 max-sm:h-8 max-sm:w-8 max-sm:text-base max-md:h-9 max-md:w-9 max-md:text-lg",
          { "text-white bg-blue-600 rounded-full": isToday }
        )}
      >
        {date.format("D")}
      </span>
    </div>
  );
};

export const renderTimeGridWeekSlotLabelContent = (
  renderProps: SlotLabelContentArg
) => {
  const hour = dayjs(renderProps.date).hour();
  if (hour === 0) return null;

  return (
    <div className="flex items-center justify-between gap-2">
      {dayjs(renderProps.date).format("h A")}
      <span className="w-2.5 min-h-px bg-gray-200"></span>
    </div>
  );
};

export const renderTimeGridWeekEventContent = (
  renderProps: EventContentArg
) => {
  const start = dayjs(renderProps.event.extendedProps.originalStartDate);
  const end = dayjs(renderProps.event.extendedProps.originalEndDate);
  const diffInMinutes = end.diff(start, "minute");

  const haveLessTime = diffInMinutes < 30;
  const timeString = `${start.format("h:mm A")} - ${end.format("h:mm A")}`;

  return (
    <div
      className={cn("px-1.5 py-0.5 flex flex-col truncate", {
        "flex-row text-xs gap-1": diffInMinutes < 40,
        "flex-row px-1 py-1 text-[11px] leading-0": haveLessTime,
      })}
    >
      <span>{renderProps.event.title}</span>
      <span>{timeString}</span>
    </div>
  );
};

export const renderTimeGridWeekAllDayContent = () => (
  <div className="text-[10px]">{getGmtTime()}</div>
);

/**
 *  ----------- timeGridDay -----------
 */
export const renderTimeGridDayDayHeaderContent = (
  renderProps: DayHeaderContentArg
) => {
  const date = dayjs(renderProps.date);
  const isToday = date.isSame(dayjs(), "day");

  return (
    <div className="w-fit flex flex-col items-center gap-px">
      <span
        className={cn("text-[11px] font-medium text-gray-500 uppercase", {
          "text-blue-600": isToday,
        })}
      >
        {date.format("ddd")}
      </span>
      <span
        className={cn(
          "h-11 w-11 flex items-center justify-center text-2xl font-normal text-gray-800 max-sm:h-8 max-sm:w-8 max-sm:text-base max-md:h-9 max-md:w-9 max-md:text-lg",
          { "text-white bg-blue-600 rounded-full": isToday }
        )}
      >
        {date.format("D")}
      </span>
    </div>
  );
};

export const renderTimeGridDaySlotLabelContent = (
  renderProps: SlotLabelContentArg
) => {
  const hour = dayjs(renderProps.date).hour();
  if (hour === 0) return null;

  return (
    <div className="flex items-center justify-between gap-2">
      {dayjs(renderProps.date).format("h A")}
      <span className="w-2.5 min-h-px bg-gray-200"></span>
    </div>
  );
};

export const renderTimeGridDayEventContent = (renderProps: EventContentArg) => {
  const start = dayjs(renderProps.event.extendedProps.originalStartDate);
  const end = dayjs(renderProps.event.extendedProps.originalEndDate);
  const diffInMinutes = end.diff(start, "minute");
  const haveLessTime = diffInMinutes < 30;
  const timeString = `${start.format("MMM D, h:mm A")} - ${end.format(
    "MMM D, h:mm A"
  )}`;

  return (
    <div
      className={cn("px-1.5 py-0.5 flex flex-col truncate", {
        "flex-row text-xs gap-1": diffInMinutes < 40,
        "flex-row px-1 py-1 text-[11px] leading-0": haveLessTime,
      })}
    >
      <span>{renderProps.event.title}</span>
      <span>{timeString}</span>
    </div>
  );
};

export const renderTimeGridDayAllDayContent = () => (
  <div className="text-[10px]">{getGmtTime()}</div>
);

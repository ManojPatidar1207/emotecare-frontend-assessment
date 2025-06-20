import type { CalendarViewTypes } from "@/domains/calendar/types";

export const viewOptions: Array<{
  label: string;
  value: CalendarViewTypes;
}> = [
  { label: "Month", value: "dayGridMonth" },
  { label: "Week", value: "timeGridWeek" },
  { label: "Day", value: "timeGridDay" },
];

export interface RawEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  isAllDay?: boolean;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  extendedProps: {
    description?: string;
    originalStartDate: string;
    originalEndDate: string;
  };
}

import type {
  CalendarEvent,
  CalendarViewTypes,
  CurrentViewDateRange,
} from "@/domains/calendar/types";
import type { EventFormValues } from "@/domains/calendar/components/types";

export interface CreateEventDialogState {
  open: boolean;
  initialData?: Partial<EventFormValues>;
}

export interface SelectedEventState {
  event: CalendarEvent | null;
  anchorEl: HTMLElement | null;
}

export interface CalendarStore {
  currentView: CalendarViewTypes;
  setCurrentView: (view: CalendarViewTypes) => void;

  currentViewDateRange: CurrentViewDateRange;
  setCurrentViewDateRange: (range: CurrentViewDateRange) => void;

  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: CalendarEvent) => void;

  createEventDialog: CreateEventDialogState;
  openCreateEventDialog: (data?: Partial<EventFormValues>) => void;
  closeCreateEventDialog: () => void;

  selectedEvent: SelectedEventState;
  selectEvent: (event: CalendarEvent, anchorEl: HTMLElement) => void;
  clearSelectedEvent: () => void;
}

import { create } from "zustand";

import type { CalendarStore } from "@/domains/calendar/store/types";

export const useCalendarStore = create<CalendarStore>()((set) => ({
  currentView: "dayGridMonth",
  setCurrentView: (view) =>
    set((state) => ({
      ...state,
      currentView: view,
    })),

  currentViewDateRange: { start: new Date(), end: new Date() },
  setCurrentViewDateRange: (range) =>
    set((state) => ({
      ...state,
      currentViewDateRange: range,
    })),

  events: [],
  setEvents: (events) =>
    set((state) => ({
      ...state,
      events,
    })),
  addEvent: (event) =>
    set((state) => ({
      ...state,
      events: [...state.events, event],
    })),

  createEventDialog: { open: false, initialData: undefined },
  openCreateEventDialog: (data) =>
    set((state) => ({
      ...state,
      createEventDialog: { open: true, initialData: data },
    })),
  closeCreateEventDialog: () =>
    set((state) => ({
      ...state,
      createEventDialog: { ...state.createEventDialog, open: false },
    })),

  selectedEvent: { event: null, anchorEl: null },
  selectEvent: (event, anchorEl) =>
    set((state) => ({
      ...state,
      selectedEvent: { event, anchorEl },
    })),
  clearSelectedEvent: () =>
    set((state) => ({
      ...state,
      selectedEvent: { event: null, anchorEl: null },
    })),
}));

import type { RawEvent } from "@/domains/calendar/types";

export const fetchEvents = async (): Promise<RawEvent[]> => {
  const res = await fetch("/mock/events.json");

  if (!res.ok) throw new Error("Failed to fetch events");

  return res.json();
};

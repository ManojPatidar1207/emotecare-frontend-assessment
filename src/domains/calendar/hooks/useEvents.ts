import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "@/domains/calendar/api";
import { convertEventsRawToCalendar } from "@/domains/calendar/utils";

export const useFetchEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const rawEvents = await fetchEvents();
      return convertEventsRawToCalendar(rawEvents);
    },
  });
};

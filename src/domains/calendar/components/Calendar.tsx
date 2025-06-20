import { useRef, useEffect } from "react";
import { Loader } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { CalendarToolbar } from "@/domains/calendar/components/CalendarToolbar";
import { CreateEventDialog } from "@/domains/calendar/components/CreateEventDialog";
import { FloatingEventPopover } from "@/domains/calendar/components/EventPopover";

import { useCalendarStore } from "@/domains/calendar/store";
import { useFetchEvents, useCalendarRoot } from "@/domains/calendar/hooks";

import "@/domains/calendar/styles/calendar.css";

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { events, setEvents, selectedEvent } = useCalendarStore();

  const { calendarViews, handleDatesSet, handleSlotClick, handleEventClick } =
    useCalendarRoot();

  const { data: eventsData, isLoading } = useFetchEvents();

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
    }
  }, [eventsData, setEvents]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader className="animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <div className="h-screen flex flex-col">
            <div className="flex-shrink-0">
              <CalendarToolbar ref={calendarRef} />
            </div>

            <div className="flex-1 fc p-4 pt-0">
              <FullCalendar
                forceEventDuration
                displayEventEnd
                dayMaxEventRows
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                height="100%"
                initialView="dayGridMonth"
                headerToolbar={false}
                events={events}
                views={calendarViews}
                datesSet={handleDatesSet}
                dateClick={handleSlotClick}
                eventClick={handleEventClick}
                select={(arg) => handleSlotClick({ date: arg.start })}
                eventTimeFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  meridiem: "short",
                }}
              />
            </div>
          </div>

          <CreateEventDialog ref={calendarRef} />

          {selectedEvent.anchorEl && selectedEvent.event && (
            <FloatingEventPopover />
          )}
        </>
      )}
    </>
  );
};

export default Calendar;

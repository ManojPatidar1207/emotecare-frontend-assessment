import { useCallback, useEffect, useMemo, type RefObject } from "react";
import type FullCalendar from "@fullcalendar/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "sonner";

import { useCalendarStore } from "@/domains/calendar/store";
import { combineDateAndTime } from "@/domains/calendar/utils";
import { createEventFormSchema } from "@/domains/calendar/validations";

import type { CalendarEvent } from "@/domains/calendar/types";
import type { EventFormValues } from "@/domains/calendar/components/types";

export const useCreateEventForm = (calendarRef: RefObject<FullCalendar>) => {
  const {
    createEventDialog,
    addEvent,
    openCreateEventDialog,
    closeCreateEventDialog,
  } = useCalendarStore();

  const initialData = useMemo(
    () => createEventDialog.initialData,
    [createEventDialog.initialData]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      title: "",
      startDate: undefined,
      startTime: "",
      endDate: undefined,
      endTime: "",
      description: "",
      ...initialData,
    },
  });

  useEffect(() => {
    reset({
      title: initialData?.title || "",
      startDate: initialData?.startDate,
      startTime: initialData?.startTime || "",
      endDate: initialData?.endDate,
      endTime: initialData?.endTime || "",
      description: initialData?.description || "",
    });
  }, [initialData, reset]);

  const handleOpenChange = useCallback(
    (open: boolean) =>
      open
        ? openCreateEventDialog(createEventDialog.initialData)
        : closeCreateEventDialog(),
    [
      closeCreateEventDialog,
      createEventDialog.initialData,
      openCreateEventDialog,
    ]
  );

  const handleEventSubmit = useCallback(
    (data: EventFormValues) => {
      const start = combineDateAndTime(data.startDate, data.startTime);
      const end = combineDateAndTime(data.endDate, data.endTime);

      const isMultiDay =
        !dayjs(start).isSame(end, "day") &&
        dayjs(end).diff(start, "minute") >= 1440;
      const isAllDay = !data.startTime || !data.endTime || isMultiDay;
      const adjustedEnd = isAllDay ? dayjs(end).add(1, "day").toDate() : end;

      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        title: data.title,
        start: start.toISOString(),
        end: adjustedEnd.toISOString(),
        allDay: isAllDay,
        extendedProps: {
          description: data.description,
          originalStartDate: start.toISOString(),
          originalEndDate: end.toISOString(),
        },
      };

      addEvent(newEvent);
      closeCreateEventDialog();

      toast.success("Event has been created.");

      calendarRef.current?.getApi().gotoDate(start);
    },
    [addEvent, calendarRef, closeCreateEventDialog]
  );

  const onSubmit = handleSubmit(handleEventSubmit);

  return {
    control,
    errors,
    onSubmit,
    handleOpenChange,
  };
};

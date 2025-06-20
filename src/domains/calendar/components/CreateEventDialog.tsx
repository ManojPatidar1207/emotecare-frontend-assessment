import { forwardRef, type RefObject } from "react";
import type FullCalendar from "@fullcalendar/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  RHFInput,
  RHFDatePicker,
  RHFTextarea,
  RHFTimeInput,
} from "@/components/react-hook-form";

import { useCalendarStore } from "@/domains/calendar/store";
import { useCreateEventForm } from "@/domains/calendar/hooks";

import type { EventFormValues } from "@/domains/calendar/components/types";

export const CreateEventDialog = forwardRef<
  FullCalendar,
  Record<string, unknown>
>((_props, ref) => {
  const { createEventDialog } = useCalendarStore();

  const { control, errors, onSubmit, handleOpenChange } = useCreateEventForm(
    ref as RefObject<FullCalendar>
  );

  return (
    <Dialog open={createEventDialog.open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Add a new event to your calendar
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6" autoComplete="off">
          <RHFInput<EventFormValues>
            name="title"
            control={control}
            label="Title"
            required
            error={errors.title}
            placeholder="Event title"
            data-testid="event-title"
          />
          <div className="flex gap-4">
            <RHFDatePicker<EventFormValues>
              name="startDate"
              control={control}
              label="Start Date"
              required
              error={errors.startDate}
              data-testid="event-start-date"
            />
            <RHFTimeInput<EventFormValues>
              name="startTime"
              control={control}
              label="Start Time"
              required
              error={errors.startTime}
              data-testid="event-start-time"
            />
          </div>
          <div className="flex gap-4">
            <RHFDatePicker<EventFormValues>
              name="endDate"
              control={control}
              label="End Date"
              required
              error={errors.endDate}
              data-testid="event-end-date"
            />
            <RHFTimeInput<EventFormValues>
              name="endTime"
              control={control}
              label="End Time"
              required
              error={errors.endTime}
              data-testid="event-end-time"
            />
          </div>
          <RHFTextarea<EventFormValues>
            name="description"
            control={control}
            label="Description"
            error={errors.description}
            placeholder="Description (optional)"
            data-testid="event-description"
          />
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              data-testid="cancel-button"
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" data-testid="save-button">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

CreateEventDialog.displayName = "CreateEventDialog";

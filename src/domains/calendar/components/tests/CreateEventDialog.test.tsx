import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, type Control, type FieldError } from "react-hook-form";

import { CreateEventDialog } from "@/domains/calendar/components/CreateEventDialog";

import * as store from "@/domains/calendar/store/useCalendarStore";
import * as useCreateEventFormModule from "@/domains/calendar/hooks/useCreateEventForm";
import type { EventFormValues } from "@/domains/calendar/components/types";

const mockOpenChange = vi.fn();
const mockOnSubmit = vi.fn((e) => e.preventDefault && e.preventDefault());

const defaultFormValues: EventFormValues = {
  title: "Test Event",
  startDate: new Date("2024-06-01"),
  startTime: "10:00",
  endDate: new Date("2024-06-01"),
  endTime: "11:00",
  description: "Test description",
};

vi.mock("@/domains/calendar/store/useCalendarStore", async () => {
  const actual = await vi.importActual<typeof store>(
    "@/domains/calendar/store/useCalendarStore"
  );
  return {
    ...actual,
    useCalendarStore: vi.fn(() => ({
      createEventDialog: { open: true, initialData: undefined },
    })),
  };
});

vi.mock("@/domains/calendar/hooks/useCreateEventForm", async () => {
  const { useForm } = await import("react-hook-form");
  return {
    useCreateEventForm: vi.fn(() => {
      const methods = useForm();
      return {
        control: methods.control,
        errors: {},
        onSubmit: mockOnSubmit,
        handleOpenChange: mockOpenChange,
      };
    }),
  };
});

function getControl(): Control<EventFormValues> {
  let control;
  function Dummy() {
    control = useForm<EventFormValues>().control;
    return null;
  }

  render(<Dummy />);

  return control as unknown as Control<EventFormValues>;
}

describe("CreateEventDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dialog and form fields", () => {
    render(<CreateEventDialog />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls handleOpenChange(false) when Cancel is clicked", async () => {
    render(<CreateEventDialog />);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelBtn);
    expect(mockOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onSubmit when Save is clicked", async () => {
    render(<CreateEventDialog />);
    const saveBtn = screen.getByRole("button", { name: /save/i });
    await userEvent.click(saveBtn);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("shows validation errors for required fields", async () => {
    vi.spyOn(useCreateEventFormModule, "useCreateEventForm").mockReturnValue({
      control: getControl(),
      errors: {
        title: { message: "Title is required", type: "required" } as FieldError,
        startDate: {
          message: "Start date is required",
          type: "required",
        } as FieldError,
        startTime: {
          message: "Start time is required",
          type: "required",
        } as FieldError,
        endDate: {
          message: "End date is required",
          type: "required",
        } as FieldError,
        endTime: {
          message: "End time is required",
          type: "required",
        } as FieldError,
      },
      onSubmit: mockOnSubmit,
      handleOpenChange: mockOpenChange,
    });
    render(<CreateEventDialog />);
    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Start date is required")).toBeInTheDocument();
    expect(screen.getByText("Start time is required")).toBeInTheDocument();
    expect(screen.getByText("End date is required")).toBeInTheDocument();
    expect(screen.getByText("End time is required")).toBeInTheDocument();
  });

  it("shows error if end date/time is before start date/time", async () => {
    vi.spyOn(useCreateEventFormModule, "useCreateEventForm").mockReturnValue({
      control: getControl(),
      errors: {
        endTime: {
          message: "End date/time must be after start date/time",
          type: "custom",
        } as FieldError,
      },
      onSubmit: mockOnSubmit,
      handleOpenChange: mockOpenChange,
    });
    render(<CreateEventDialog />);
    expect(
      screen.getByText("End date/time must be after start date/time")
    ).toBeInTheDocument();
  });

  it("renders with initialData if provided", () => {
    vi.mocked(store.useCalendarStore).mockReturnValue({
      createEventDialog: { open: true, initialData: defaultFormValues },
    } as unknown as ReturnType<typeof store.useCalendarStore>);
    render(<CreateEventDialog />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render dialog if open is false", () => {
    vi.mocked(store.useCalendarStore).mockReturnValue({
      createEventDialog: { open: false, initialData: undefined },
    } as unknown as ReturnType<typeof store.useCalendarStore>);
    render(<CreateEventDialog />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

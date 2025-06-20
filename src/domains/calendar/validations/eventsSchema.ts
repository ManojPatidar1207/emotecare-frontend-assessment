import { z } from "zod";
import dayjs from "dayjs";

import { TIME_REGEX } from "@/domains/calendar/regex";

export const createEventFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    startTime: z
      .string()
      .regex(TIME_REGEX, "Start time must be in HH:mm format")
      .min(1, "Start time is required"),
    endDate: z.date({ required_error: "End date is required" }),
    endTime: z
      .string()
      .regex(TIME_REGEX, "End time must be in HH:mm format")
      .min(1, "End time is required"),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const start = dayjs(data.startDate)
      .hour(Number(data.startTime.split(":")[0]))
      .minute(Number(data.startTime.split(":")[1]))
      .second(0)
      .millisecond(0);

    const end = dayjs(data.endDate)
      .hour(Number(data.endTime.split(":")[0]))
      .minute(Number(data.endTime.split(":")[1]))
      .second(0)
      .millisecond(0);

    if (!end.isAfter(start)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date/time must be after start date/time",
        path: ["endTime"],
      });
    }
  });

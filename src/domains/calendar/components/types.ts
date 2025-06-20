import { z } from "zod";

import { createEventFormSchema } from "@/domains/calendar/validations";

export type EventFormValues = z.infer<typeof createEventFormSchema>;

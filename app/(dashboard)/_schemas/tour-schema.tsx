import { z } from "zod";

// Step schema
export const stepSchema = z.object({
  id: z.string().min(1, "Step ID is required"),
  order: z.number().min(1, "Order must be at least 1"), // number, min is validator
  // selector: z.string().min(1, "Selector is required"),
  title: z.string().min(1, "Step title is required"),
  description: z.string().min(1, "Step description is required"),
});

// Tour schema
export const tourSchema = z.object({
  id: z.string().optional(), // backend-generated or random
  name: z.string().min(1, "Tour name is required"),
  description: z.string().optional(),
  steps: z.array(stepSchema).min(5, "A tour must have at least 5 steps"), // pass number as second argument (min count)
});

// Types
export type TourFormValues = z.infer<typeof tourSchema>;
export type StepFormValues = z.infer<typeof stepSchema>;

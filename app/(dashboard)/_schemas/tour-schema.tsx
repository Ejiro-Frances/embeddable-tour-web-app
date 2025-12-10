import { z } from "zod";

// Step schema
export const stepSchema = z.object({
  id: z.string().optional(),
  order: z.number().min(1, "Order must be at least 1"),
  title: z.string().min(1, "Step title is required"),
  description: z.string().min(1, "Step description is required"),
});

// Tour schema
export const tourSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Tour name is required"),
  description: z.string().optional(),
  steps: z.array(stepSchema).min(5, "A tour must have at least 5 steps"),
});

// Types
export type TourFormValues = z.infer<typeof tourSchema>;
export type StepFormValues = z.infer<typeof stepSchema>;

import { z } from "zod";

export const FormSchema = z.object({
  school: z.string({
    required_error: "Please select a school.",
  }),
  name: z.string({
    required_error: "Please enter building name.",
  }),
  year: z.string().optional(),
  location: z.string({
    required_error: "Please enter location.",
  }),
  storey: z.string().optional().default(""),
  building_type: z.string().optional().default(""),
  structure_type: z.string().optional().default(""),
  occupancy: z.string().optional().default(""),
  rvs_score: z.coerce.number().optional().default(0),
  vulnerability: z.string().optional().default(""),
  physical_conditions: z.string().optional().default(""),
  compliance: z.coerce
    .number()
    .min(0, "Must be 0-100 only.")
    .max(100, "Must be 0-100 only.")
    .optional()
    .default(0),
  remarks: z.string().optional(),
  mitigation_actions: z.string().optional(),
});

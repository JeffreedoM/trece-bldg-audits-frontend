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
  storey: z.string().optional(),
  building_type: z.string().optional(),
  structure_type: z.string().optional(),
  occupancy: z.string().optional(),
  rvs_score: z.coerce.number().optional(),
  vulnerability: z.string().optional(),
  physical_conditions: z.string().optional(),
  compliance: z.coerce
    .number()
    .min(0, "Must be 0-100 only.")
    .max(100, "Must be 0-100 only.")
    .optional(),
  remarks: z.string().optional(),
  hazard: z.string().optional(),
});

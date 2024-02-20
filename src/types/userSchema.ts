
import { z } from "Zod"

export const userSchema = z.object({
  id: z.number().transform(num => num.toString()), // backend has number Id, user Interface uses a string for the id.
  username: z
    .string(),
  email: z
    .string()
    .optional()
    .nullable(),
  key: z.string(),
  role: z.string()
})
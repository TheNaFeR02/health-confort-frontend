import { z } from 'Zod'

export const serverErrorSchema = z.object({
  non_field_errors: z.array(z.string())
});

export type ServerError = z.infer<typeof serverErrorSchema>;
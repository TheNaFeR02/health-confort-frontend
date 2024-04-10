import { z } from 'Zod'

export const PatientsStats = z.object({
  total: z.number(),
  overdue: z.number(),
  pending: z.number(),
  paid: z.number(),
});

export type PatientsStats = z.infer<typeof PatientsStats>;
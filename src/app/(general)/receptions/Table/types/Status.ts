// export enum Status {
//   Pending = "Pending",
//   Paid = "Paid",
//   Overdue = "Overdue",
// }

import { z } from 'Zod';

export const StatusEnum = z.enum(["Pending", "Paid", "Overdue"]);

export type Status = z.infer<typeof StatusEnum>;
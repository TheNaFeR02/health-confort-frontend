// import { Status } from "./Status"

// export type Reception = {
//   Number: string;
//   Date: string;
//   Customers: string;
//   TotalAmount: number;
//   DueDate: Date;
//   Status: Status;
//   Email: string;
// };

import { z } from 'Zod';
import { StatusEnum } from './Status';

export const ReceptionSchema = z.object({
  Number: z.string(),
  Date: z.date(),
  Customers: z.string(),
  TotalAmount: z.number(),
  DueDate: z.date(),
  Status: StatusEnum,
  Email: z.string().email(),
});

export type Reception = z.infer<typeof ReceptionSchema>;
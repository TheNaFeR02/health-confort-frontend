import { Status } from "./Status"

export type Invoice = {
  Number: string;
  Date: string;
  Customers: string;
  TotalAmount: number;
  DueDate: Date;
  Status: Status;
  Email: string;
};
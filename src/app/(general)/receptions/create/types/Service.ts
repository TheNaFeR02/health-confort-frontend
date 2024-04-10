export interface Patient {
  Service: string;
  Invoice: string;
  Date: string;
  TotalAmount: number;
  PendingAmount: number;
}

export type Service = {
  customerId: number;
  patients: Patient[];
}

export type Services = Service[];


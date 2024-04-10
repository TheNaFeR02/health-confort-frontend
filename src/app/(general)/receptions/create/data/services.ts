import { Service } from '../types/Service'

// This should be the services of the customer
export const services: Service[] = [
  {
    customerId: 1,
    patients: [
      {
        Service: "R12737 / Pablo Neruda - 63449182 / Entrance",
        Invoice: "INV8765848",
        Date: "02 Mar 2022",
        TotalAmount: 328000,
        PendingAmount: 328000
      },
      {
        Service: "R12736 / Pablo Picasso - 100327162 / Entrance",
        Invoice: "INV8765848",
        Date: "02 Mar 2022",
        TotalAmount: 1150000,
        PendingAmount: 1150000,
      },
      {
        Service: "R12736 / Pablo Picasso - 100327162 / Entrance",
        Invoice: "INV8765848",
        Date: "02 Mar 2022",
        TotalAmount: 1150000,
        PendingAmount: 0,
      },
    ]
  }
];
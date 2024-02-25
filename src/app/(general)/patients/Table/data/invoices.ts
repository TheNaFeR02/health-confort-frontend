import { Status } from "../types/Status";

export const invoices = [
  {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Medilaboral / Construcciones Bolivar",
    TotalAmount: 150000,
    DueDate: new Date("2024-02-06", ),
    Status: Status.Pending,
    Email: 'acunafer.02@gmail.com'
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Medilaboral / Construcciones Bolivar",
    TotalAmount: 150000,
    DueDate: new Date("2024-01-06"),
    Status: Status.Pending,
    Email: 'games_nafer@hotmail.com',
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Shalem Janna Uninorte",
    TotalAmount: 150000,
    DueDate: new Date("2024-01-07"),
    Status: Status.Overdue,
    Email: 'jannas@uninorte.edu.co',
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Shalem Janna Gmail",
    TotalAmount: 150000,
    DueDate: new Date("2024-01-08"),
    Status: Status.Pending,
    Email: 'sjanna10@gmail.com',
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Medilaboral / Construcciones Bolivar",
    TotalAmount: 150000,
    DueDate: new Date("2023-12-06"),
    Status: Status.Paid,
    Email: '',
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Medilaboral / Construcciones Bolivar",
    TotalAmount: 150_000,
    DueDate: new Date("2023-12-07"),
    Status: Status.Paid,
    Email: '',
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Medilaboral / Construcciones Bolivar",
    TotalAmount: 150_000,
    DueDate: new Date("2023-12-08"),
    Status: Status.Pending,
    Email: '',
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Medilaboral / Construcciones Bolivar",
    TotalAmount: 150000,
    DueDate: new Date("2023-01-15"),
    Status: Status.Overdue,
    Email: '',
  }, {
    Number: "INV1578932",
    Date: "31 Dic 2022",
    Customers: "Medilaboral / Construcciones Bolivar",
    TotalAmount: 150000,
    DueDate: new Date("1999-05-03"),
    Status: Status.Overdue,
    Email: '',
  },
];
import { Customer } from '../types/Customer'

export const customers: Customer[] =
  [
    {
      id: 1,
      customer: {
        CustomerDetails: {
          name: "Medilaboral Salud y Seguridad Laboral",
          NIT: "4-9008367263",
          phone: "+57 3014072140",
          email: "contabilidad@medilaboral.com",
          address: "Calle 100 # 52 -20",
          Location: "Bogotá, Colombia"
        },
        FacturationAddress: {
          address: "Calle 100 # 52 -20",
          location: "Bogotá, Colombia"
        },
        TaxRetention: 0.02
      }
    },
    {
      id: 2,
      customer: {
        CustomerDetails: {
          name: "",
          NIT: "",
          phone: "",
          email: "",
          address: "",
          Location: ""
        },
        FacturationAddress: {
          address: "",
          location: ""
        },
        TaxRetention: 0
      }
    }
  ]
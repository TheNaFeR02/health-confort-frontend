export type Customer = {
  id: number;
  customer: {
    CustomerDetails: {
      name: string;
      NIT: string;
      phone: string;
      email: string;
      address: string;
      Location: string;
    };
    FacturationAddress: {
      address: string;
      location: string;
    };
    TaxRetention: number;
  };
}
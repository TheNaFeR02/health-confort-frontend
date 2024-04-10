import { z } from 'Zod';
import { format } from 'date-fns';

export const PatientSchema = z.object({
  first_name: z.string().min(1, 'Name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  document_type: z.string().min(1, 'Document type is required'),
  document_id: z.string().min(1, 'Document ID is required'),
  gender: z.enum(['Male', 'Female']),
  email: z.string().email().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
  // birthdate: z.date().transform((val) => format(new Date(val), 'yyyy-MM-dd')), 
  birthdate: z.date(), 
  marital_status: z.enum(['Single', 'Married', 'Widowed', 'Divorced', 'Separated']),
  blood_type: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
});

export type Patient = z.infer<typeof PatientSchema>;

export const PatientListSchema = z.array(PatientSchema);
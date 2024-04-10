import { parseURL } from "@/utils/parseURL";
import { Patient, PatientListSchema, PatientSchema } from "../types/Patient";


export default async function getPatients(): Promise<Patient[]> {
  try {
    const response = await fetch(parseURL('/patients'), {
      method: 'GET',
      //....
    });
    const patients = await response.json();


    patients.forEach((patient: Patient) => {
      patient.birthdate = new Date(patient.birthdate);
    });

    const serverResponse = PatientListSchema.safeParse(patients)
    if (serverResponse.success) {
      return serverResponse.data;
    }

    throw new Error('Invalid server response');
  } catch (error) {
    console.log(error);
    throw error
  }
}
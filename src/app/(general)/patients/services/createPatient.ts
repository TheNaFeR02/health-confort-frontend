import { parseURL } from "@/utils/parseURL";
import { Patient } from "../types/Patient";
import { ServerKnownError, genericErrorSchema } from "@/errors/errors";
import format from "date-fns/format";


export default async function createPatient(patient: Patient, apiToken: string | null | undefined): Promise<Patient> {
  // TODO: Implement this function
  console.log("entró");
  try {
    const res = await fetch(parseURL("/api/clinic/patients/"), {
      method: 'POST',
      body: JSON.stringify({
        ...patient, 
        birthdate: format(patient.birthdate, 'yyyy-MM-dd')}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${apiToken}`
      }
    });

    if (res.status === 201) {
      return await res.json();
    }

    const data = await res.json();

    const serverError = genericErrorSchema.safeParse(data);

    if (serverError.success) {
      console.error("Server responded with known error: ", serverError.data);
      throw new ServerKnownError("", serverError.data);
    }

    throw new Error('Unexpected server response during registration')
  } catch (error) {
    throw error
  }
} 
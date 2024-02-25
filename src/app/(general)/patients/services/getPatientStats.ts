import { PatientsStats } from '../types/PatientsStats';
import patient_stats from '../data/patients_stats.json'

export default async function getPatientsStats(): Promise<PatientsStats> {

  // implement the logic to get the patient stats from API.

  return patient_stats;
}
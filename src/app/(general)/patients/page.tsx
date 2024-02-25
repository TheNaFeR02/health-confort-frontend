import PatientsList from "./patientsList"
import getPatientStats from "./services/getPatientStats"

export default async function Patients() {
  const patientsStats = await getPatientStats()

  return (
    <PatientsList patientsStats={patientsStats}/>
  )
}
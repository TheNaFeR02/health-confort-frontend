import Receptions from "./receptions"
import getPatientStats from "./services/getPatientStats"
import getReceptionsList from "./services/getReceptionsList"

export default async function Patients() {
  const patientsStats = await getPatientStats()
  const receptions = await getReceptionsList()

  return (
    <Receptions patientsStats={patientsStats} receptions={receptions}/>
  )
}
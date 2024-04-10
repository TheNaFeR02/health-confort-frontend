import getPatients from "../../patients/services/getPatients";
import NewReception from "./newReception";


const patientList = async () => {
  try {
    const response = await getPatients();
    return response

  } catch (error) {
    console.log(error);
    return []
  }
}

export default async function selectPatient() {
  const patients = await patientList();
  
  return <NewReception patientsList={patients} />;
}
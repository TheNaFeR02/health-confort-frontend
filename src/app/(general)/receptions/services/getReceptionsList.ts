import { Reception } from "../Table/types/Reception";
import receptions_list from "../data/receptions.json"


export default async function getReceptionsList(): Promise<Reception[]> {
  
  const formattedReceptionsList: Reception[] = receptions_list.map((reception) => ({
    ...reception,
    Date: new Date(reception.Date),
    DueDate: new Date(reception.DueDate),
    Status: reception.Status as "Pending" | "Overdue" | "Paid",
  }));

  console.log(formattedReceptionsList)
  return formattedReceptionsList; // Validate the response from the server with the schema.

}
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Service, Patient } from "../types/Service";
import { Chip } from "@mui/material";


//should be memoized or stable

export default function tableColumns() {
  const columns = useMemo<MRT_ColumnDef<Patient>[]>(
    () => [
      {
        accessorKey: "Service", //access nested data with dot notation
        header: "Service/Product",
        size: 350,
      },
      {
        accessorKey: "Invoice",
        header: "Invoice",
        size: 100,
        Cell: ({ cell, row }) => {
          // if (cell.getValue()?.toString() === 'Available') {
          //   return <Chip
          //     label={cell.getValue()?.toString()}
          //     color="success"
          //   />;
          if(row.original.PendingAmount === 0){
            return <Chip
              label='Available'
              color="success"
            />;
          } else {
            return <p>{cell.getValue()?.toString()}</p>;
          }
        },
      },
      {
        accessorKey: "Date",
        header: "Date",
        size: 150,
      },
      {
        accessorKey: "TotalAmount", //normal accessorKey
        header: "Total amount",
        size: 70,
      },
      {
        accessorKey: "PendingAmount",
        header: "Pending amount",
        size: 70,
      },
    ],
    []
  );
  return columns;
}


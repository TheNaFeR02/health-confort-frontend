import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Reception } from "./types/Reception";
import { Chip } from "@mui/material";



//should be memoized or stable

export default function TableColumns(filterStatus: string) {
  const columns = useMemo<MRT_ColumnDef<Reception>[]>(
    () => [
      {
        accessorKey: "Email",
        header: "Email",
        size: 170,
      },
      {
        accessorKey: "Date",
        header: "Reception date",
        size: 100,
        Cell: ({ cell }) => {
          const dateString = cell.getValue() as string;
          const date = new Date(dateString);


          const day = date.getDate().toString();
          const month = date.toLocaleDateString('en-US', { month: 'short' });
          const year = date.getFullYear().toString();

          return <p>{day + " " + month + " " + year}</p>
        }
      },
      {
        accessorKey: "Customers", //normal accessorKey
        header: "Customers",
        size: 250,
      },
      {
        accessorKey: "TotalAmount",
        header: "Total amount",
        size: 70,
      },
      {
        accessorKey: "DueDate",
        header: "Due Date",
        size: 150,
        Cell: ({ cell }) => {
          const dateString = cell.getValue() as string;
          const date = new Date(dateString);


          const day = date.getDate().toString();
          const month = date.toLocaleDateString('en-US', { month: 'short' });
          const year = date.getFullYear().toString();

          return <p>{day + " " + month + " " + year}</p>
        }
      },
      {
        accessorKey: "Status",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => {
          const cellValue = cell.getValue()?.toString();

          if (cellValue === 'Overdue') {
            return <Chip
              label={cell.getValue()?.toString()}
              color="error"
            />;
          }

          if (cellValue === 'Paid') {
            return <Chip
              label={cell.getValue()?.toString()}
              color="success"
            />;
          }

          if (cellValue === 'Pending') {
            return <Chip
              label={cell.getValue()?.toString()}
              color="warning"
            />;
          }

          else {
            return <p>{cell.getValue()?.toString()}</p>;
          }
        },
      },
    ],
    []
  );
  return columns;
}


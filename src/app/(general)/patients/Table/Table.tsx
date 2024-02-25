"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Invoice } from "./types/Invoice";
import { invoices } from "./data/invoices";
import TableColumn from "./TableColumns";
import TopToolbarCustomActions from "./TopToolbarCustomActions";
import ToolbarInternalActions from "./ToolbarInternalActions";
import BottomToolbarCustomActions from "./BottomToolbarCustomActions";
import dayjs, { Dayjs } from 'dayjs';



// ----------------------------------------------------------------------------------------
const initialData: Invoice[] = invoices;
const InvoicesTable = ({ filterStatus }: { filterStatus: string }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-02-06'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-02-06'));
  const columns = TableColumn(filterStatus);

  const [data, setData] = useState<Invoice[]>(initialData);
  const [dataByDate, setDataByDate] = useState<Invoice[]>(initialData);


  const filterByDateRange = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    // Filter invoices based on the start and end date
    const filteredData = initialData.filter(invoice => {
      const invoiceDate = dayjs(invoice.DueDate); // assuming invoice.date is the date field
      return invoiceDate.isAfter(startDate) && invoiceDate.isBefore(endDate);
    });
    // setData(filteredData)
    setDataByDate(filteredData);
  }

  // Filter the data based on filterStatus
  const filteredData = useMemo(() => {
    if (!filterStatus || filterStatus === 'All') {
      // If filterStatus is not set, return all data
      return dataByDate;
    } else {
      // If filterStatus is set, return only the data where the status matches filterStatus
      return dataByDate.filter(invoice => invoice.Status === filterStatus);
    }
  }, [filterStatus, dataByDate]);


  // Update data state when filterStatus or filteredData changes
  useEffect(() => {
    setData(filteredData);
  }, [filterStatus, filteredData,]);


  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableColumnActions: false,
    enableSorting: false,
    enableRowActions: false,
    enableSelectAll: true,
    initialState: { columnVisibility: {Email: true} },

    renderTopToolbarCustomActions: () => <TopToolbarCustomActions />,

    renderToolbarInternalActions: ({ table }) => <ToolbarInternalActions table={table} startDate={startDate} endDate={endDate} filterByDateRange={filterByDateRange} data={data} />,

    // Aquí puedes agregar más acciones en la parte inferior de la tabla
    renderBottomToolbarCustomActions: ({ table }) => <BottomToolbarCustomActions table={table} />,


    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "surfaceContainerHighest.main",
      },
    },

    muiPaginationProps: {
      rowsPerPageOptions: [1, 2, 5, 10, 25, 50, 100],
    },
    paginationDisplayMode: "pages",
  });


  return <MaterialReactTable table={table} />;
};

export default InvoicesTable;

'use client'
import { Box, IconButton, Divider } from "@mui/material";
import { MRT_ToggleGlobalFilterButton } from "material-react-table";
import React, { useEffect, useState } from "react";
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import isEmail from 'validator/lib/isEmail';
import { useRouter } from 'next/navigation'

import {
  Add as AddIcon,
  Email as EmailIcon,
  Tune as TuneIcon,
  Download as DownloadIcon,
  BorderClear,
} from "@mui/icons-material";
import { Reception } from "./types/Reception";
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Resend } from 'resend';
import { EmailTemplate } from "./email/email-template";
import { redirect } from 'next/navigation'

interface Props {
  table: any;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  data: Reception[];
  filterByDateRange: (arg1: Dayjs | null, arg2: Dayjs | null) => void;
}

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});


export default function ToolbarInternalActions({ table, startDate, endDate, data, filterByDateRange, }: Props) {
  const router = useRouter()

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  // const handleEmails = async () => {
  //   const selectedRows = table.getSelectedRowModel().rows; 
  //   const emailsFromTable = selectedRows.filter((row: any) => isEmail(row.original.Email) === true).map((row:any)=> row.original.Email)

  //   // Loop through the emails and send a request for each one
  //   await fetch(`/api/send`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       from: 'Acme <onboarding@resend.dev>',
  //       to: emailsFromTable, // Add the recipient's email
  //       subject: 'What a wonderful world!',
  //       // react: EmailTemplate({ firstName: 'Fernando' }),
  //       text: 'Your email body here',
  //     }),
  //   });

  // }


  // Resend only allows 10 requests per second, so we need to send the emails in batches with a delay
  const handleEmails = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const emailsFromTable = selectedRows.filter((row: any) => isEmail(row.original.Email)).map((row: any) => row.original.Email);

    // Function to send emails in batch with delay
    const sendEmailsInBatchWithDelay = async (emails: Array<String>) => {
      try {
        await fetch(`/api/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Acme <onboarding@resend.dev>',
            to: emails, // Add the recipient's emails as an array
            subject: 'What a wonderful world!',
            text: 'Your email body here',
          }),
        });
      } catch (error) {
        console.error('Error sending emails:', error);
        // Handle error appropriately, e.g., show a notification to the user
      }
    };

    // Calculate number of batches and emails per batch
    const batchSize = 10; // Maximum emails per batch
    const numBatches = Math.ceil(emailsFromTable.length / batchSize);

    // Send emails in batches with a delay to respect the limit of 10 requests per second
    for (let i = 0; i < numBatches; i++) {
      const start = i * batchSize;
      const end = Math.min((i + 1) * batchSize, emailsFromTable.length);
      const batchEmails = emailsFromTable.slice(start, end);

      await sendEmailsInBatchWithDelay(batchEmails);
      await new Promise(resolve => setTimeout(resolve, 100)); // Delay of 100ms between batches
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        color: "text.secondary",
        "& svg": {
          m: 1,
        },
        "& hr": {
          mx: 0.5,
        },
      }}
    >
      <MRT_ToggleGlobalFilterButton table={table} />

      <IconButton
        onClick={() => {
          router.push('/tariffs/new'); // change to invoices
        }}
      >
        <AddIcon />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: 'rgb(121, 116, 126, 0.12)' }} />

      <Box sx={{ display: 'flex', width: '24em', }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{ mx: 1, }}
            value={startDate}
            onChange={(newValue) => {
              filterByDateRange(newValue, endDate)
            }}
            format="D MMM YYYY"
            slots={{ openPickerIcon: EventRepeatOutlinedIcon }}
            label="Start Date"
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{ mr: 1, height: '3em' }}
            value={endDate}
            onChange={(newValue) => {
              filterByDateRange(startDate, newValue)
            }}
            format="D MMM YYYY"
            slots={{ openPickerIcon: CalendarMonthOutlinedIcon }}
            label="End Date"
          />
        </LocalizationProvider>
      </Box>

      <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: 'rgb(121, 116, 126, 0.12)' }} />
      <IconButton
        onClick={() => {
          alert("Not implemented yet! Sorry :(" + "\n\n" + "Open filters.");
        }}
      >
        <TuneIcon />
      </IconButton>

      <IconButton
        onClick={handleEmails}
      >
        <EmailOutlinedIcon />
      </IconButton>
      <IconButton
        onClick={handleExportData}
      >
        <DownloadIcon />
      </IconButton>
    </Box>
  );
}

import { Box, IconButton, Divider } from "@mui/material";
import { table } from "console";
import { MRT_ToggleGlobalFilterButton } from "material-react-table";
import React from "react";

import {
  Add as AddIcon,
  Email as EmailIcon,
  Tune as TuneIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

interface Props {
  table: any;
}

export default function ToolbarInternalActions({ table }: Props) {
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
      <Divider orientation="vertical" variant="middle" flexItem sx={{borderColor:'rgb(121, 116, 126, 0.12)'}}/>
      <IconButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20 5.75H4V4.25H20V5.75ZM20 12.75H4V11.25H20V12.75ZM4 19.75H20V18.25H4V19.75Z" fill="#21191D" />
        </svg>
      </IconButton>
      <IconButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20 6.75H4V5.25H20V6.75ZM20 12.75H4V11.25H20V12.75ZM4 18.75H20V17.25H4V18.75Z" fill="#884B6B" />
        </svg>
      </IconButton>
      <IconButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20 8.75H4V7.25H20V8.75ZM20 12.75H4V11.25H20V12.75ZM4 16.75H20V15.25H4V16.75Z" fill="#21191D" />
        </svg>
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem sx={{borderColor:'rgb(121, 116, 126, 0.12)'}}/>
      <IconButton
        onClick={() => {
          alert("Not implemented yet! Sorry :(" + "\n\n" + "Open filters.");
        }}
      >
        <TuneIcon />
      </IconButton>
    </Box>
  );
}

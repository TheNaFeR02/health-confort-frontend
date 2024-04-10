import { Box } from "@mui/material";
import { MRT_ToggleDensePaddingButton } from "material-react-table";
import React from "react";

interface Props {
  table: any;
}
export default function BottomToolbarCustomActions({ table }: Props) {
  return (
    <Box>
      <MRT_ToggleDensePaddingButton table={table} />
    </Box>
  );
}

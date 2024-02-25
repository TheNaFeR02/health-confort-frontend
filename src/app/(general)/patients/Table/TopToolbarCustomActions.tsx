import { Box, Typography } from "@mui/material";
import React from "react";

export default function TopToolbarCustomActions() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        color: "onSurface.main",
        width: "100%",
        p: 1.5,
        // color: "surface.main",
      }}
    >
      <Typography variant="body1" sx={{fontWeight: 'bold'}}>Invoices</Typography>
    </Box>
  );
}

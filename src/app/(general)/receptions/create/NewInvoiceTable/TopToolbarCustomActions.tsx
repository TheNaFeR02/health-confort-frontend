import { Box, Typography } from "@mui/material";
import React from "react";

export default function TopToolbarCustomActions() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        // color: "text.secondary",
        width: "100%",
        p: 1.5,
        color: "surface.main",
      }}
    >
      <Typography variant="body1">Companies list</Typography>
    </Box>
  );
}

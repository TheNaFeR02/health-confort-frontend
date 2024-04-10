"use client"
import { Theme, ThemeProvider } from "@emotion/react";
import createTheme from "@mui/material/styles/createTheme";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import React from "react";

const theme = createTheme()

type ProvidersProps = {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }: ProvidersProps) => {
  return <ThemeProvider theme={theme}>
    <SessionProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {children}
      </AppRouterCacheProvider>
    </SessionProvider>
  </ThemeProvider>;
}

export default Providers;
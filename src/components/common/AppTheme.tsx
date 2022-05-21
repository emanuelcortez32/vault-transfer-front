import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

type AppThemeProps = {
  children: JSX.Element[]
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#364652',
      },
      secondary: {
        main: '#AED9E0',
      },
    },
  });

export const AppTheme = ({children}: AppThemeProps): JSX.Element => (<ThemeProvider theme={theme}>{children}</ThemeProvider>)
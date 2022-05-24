import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

type AppThemeProps = {
  children: JSX.Element|JSX.Element[]
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#14213d',
      },
      secondary: {
        main: '#fca311',
      },
      background: {
        default: '#000814',
        paper: '#000814'
      }
    },
  });

export const AppTheme = ({children}: AppThemeProps): JSX.Element => (<ThemeProvider theme={theme}>{children}</ThemeProvider>)
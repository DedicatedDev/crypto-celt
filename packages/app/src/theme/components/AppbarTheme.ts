import { Components, Theme } from '@mui/material'

export default function AppbarTheme(theme: Theme): Components {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  }
}

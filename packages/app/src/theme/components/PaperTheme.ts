import { Components, Theme } from '@mui/material'

export default function PaperTheme(theme: Theme): Components {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },
  }
}

import { Components, Theme } from '@mui/material'

export default function ChipTheme(theme: Theme): Components {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.common.white,
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: theme.spacing(1),
          minWidth: 100,
        },
      },
    },
  }
}

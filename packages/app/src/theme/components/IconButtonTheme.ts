import { Components, Theme } from '@mui/material'

export default function IconButtonTheme(theme: Theme): Components {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.common.white,
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: theme.spacing(1),
        },
      },
    },
  }
}

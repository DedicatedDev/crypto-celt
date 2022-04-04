import { Components, Theme } from '@mui/material'

export default function ButtonTheme(theme: Theme): Components {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          border: '1px solid #FFF',
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
  }
}

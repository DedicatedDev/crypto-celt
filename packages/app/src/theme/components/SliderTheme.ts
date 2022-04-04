import { Components, Theme } from '@mui/material'

export default function SliderTheme(theme: Theme): Components {
  return {
    MuiSlider: {
      defaultProps: {},
      styleOverrides: {
        root: {
          backgroundColor: '#0070C0',
          borderColor: '#202B44',
          borderWidth: 2,
          borderStyle: 'solid',
          padding: '12px 12px',
          width: 'calc(100% - 24px)',
          '@media (pointer: coarse)': {
            padding: '12px 12px',
            width: 'calc(100% - 24px)',
          },
          borderRadius: 15,
        },
        thumb: {
          height: 16,
          width: 16,
          backgroundColor: '#FFB923',
        },
        track: {
          background: theme.palette.background.default,
          borderColor: theme.palette.background.default,
          height: 12,
        },
        rail: {
          height: 12,
          backgroundColor: '#8FBEFF',
          opacity: 1,
          width: 'calc(100% - 24px)',
          '@media (pointer: coarse)': {
            width: 'calc(100% - 24px)',
          },
        },
      },
    },
  }
}

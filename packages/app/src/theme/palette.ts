import { PaletteOptions } from '@mui/material'

const palette: { light?: PaletteOptions; dark?: PaletteOptions } = {
  light: {
    primary: {
      main: '#03AEF0',
      dark: '#1E4070',
    },
    background: {
      paper: '#52b48b',
      default: '#52b48b',
    },
  },
  dark: {
    mode: 'dark',
    primary: {
      main: '#03AEF0',
      dark: '#1E4070',
    },
    background: {
      paper: '#ffff',
      default: '#ffffff',
    },
  },
}

export default palette

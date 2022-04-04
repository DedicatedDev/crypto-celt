import { createTheme, CssBaseline, ThemeOptions, ThemeProvider } from '@mui/material'
import { useMemo, ReactNode } from 'react'
import useSettings from '../hooks/useSetting'
import breakpoints from './breakpoints'
import componentOverrides from './components'
import palette from './palette'

type ThemeConfigProps = {
  children: ReactNode
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const { themeMode } = useSettings()
  const isLight = themeMode === 'light'

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      //palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
      shape: {
        borderRadius: 8,
      },
      breakpoints: breakpoints,
    }),
    [isLight]
  )

  const theme = createTheme(themeOptions)
  theme.components = componentOverrides(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

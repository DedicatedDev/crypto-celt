import { ThemeOptions, createTheme } from "@mui/material/styles"
import breakpoints from "./breakpoints"
import palette from "./palette"
import typography from "./typography"

const theme: ThemeOptions = {
  typography: typography,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints:breakpoints,
}
export const lightTheme = createTheme({
  palette: palette.lightPalette,
  ...theme,
})
export const darkTheme = createTheme({
  palette: palette.darkPalette,
  ...theme,
})

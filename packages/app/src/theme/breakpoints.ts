// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true // removes the `xs` breakpoint
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
  }
}
const breakpoints = {
  values: {
    xs: 0,
    sm: 320,
    md: 568,
    lg: 768,
    xl: 1402,
    xxl: 1920,
  },
}

export default breakpoints

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
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1536,
    xxl: 1920,
  },
}

export default breakpoints

import { Breakpoint, useTheme,useMediaQuery } from "@mui/material"

export const useBreakPoint = (breakpoint?:Breakpoint) => {
    const theme = useTheme()
    const match = useMediaQuery(theme.breakpoints.up(breakpoint ?? "lg"));
    console.log(match)
    return match
}
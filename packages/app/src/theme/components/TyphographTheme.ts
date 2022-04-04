import { Components, Theme } from "@mui/material";

export default function TyphographTheme(theme: Theme): Components {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
           color: theme.palette.primary.main,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.getContrastText(
            theme.palette.primary.main
          ),
          paddingLeft: 8,
        },
      },
    },
  };
}

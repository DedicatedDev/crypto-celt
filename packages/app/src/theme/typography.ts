// ---------------------------------------------------------------------

import { TypographyOptions } from "@mui/material/styles/createTypography";

function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

const SOURCE_CODE_PRO_FAMILY = [
  'Lato', 'sans-serif'
].join(",");


declare module "@mui/material/styles/createTypography" {}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    nav: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    nav?: React.CSSProperties;
  }

  interface TypographyVariants {
    giftText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    giftText?: React.CSSProperties;
  }

}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    //h3: false;
  }
}

const typography: TypographyOptions = {
  fontFamily: SOURCE_CODE_PRO_FAMILY,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightBold: 700,
  h1: {
    fontFamily: SOURCE_CODE_PRO_FAMILY,
    fontWeight: 700,
    fontSize: pxToRem(30),
  },
  h2: {
    fontFamily: SOURCE_CODE_PRO_FAMILY,
    fontWeight: 700,
    fontSize: pxToRem(24),
    lineHeight: 32 / 24,
  },
  h3: {
    fontFamily: SOURCE_CODE_PRO_FAMILY,
    fontWeight: 700,
    fontSize: pxToRem(22),
  },
  h4: {
    fontSize: pxToRem(20),
    lineHeight: 24 / 20,
  },
  h5: {
    fontWeight: 700,
    fontSize: pxToRem(18),
  },
  h6: {
    fontWeight: 700,
    fontSize: pxToRem(17),
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: pxToRem(12),
    lineHeight: 16 / 12,
  },
  body1: {
    fontSize: pxToRem(16),
    lineHeight: 24 / 16,
  },
  body2: {
    fontSize: pxToRem(12),
    lineHeight: 16 / 12,
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 16 / 12,
  },
  button: {
    fontWeight: 700,
    fontSize: pxToRem(16),
  },
  nav: {
    fontWeight: 700,
    fontSize: pxToRem(20)
  },
  giftText: {
    fontWeight: 900,
    fontSize: pxToRem(28)
  }
};

export default typography;

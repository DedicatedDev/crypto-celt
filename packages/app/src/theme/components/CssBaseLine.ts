import { Components } from "@mui/material"
import LatoBoldTtf from "../../assets/fonts/lato/Lato-Bold.ttf"
import LatoBlackTtf from "../../assets/fonts/lato/Lato-Black.ttf"
import LatoBlackItalicTtf from "../../assets/fonts/lato/Lato-BlackItalic.ttf"
import LatoItalicTtf from "../../assets/fonts/lato/Lato-Italic.ttf"
import LatoLightTtf from "../../assets/fonts/lato/Lato-Light.ttf"
import LatoLightItalicTtf from "../../assets/fonts/lato/Lato-LightItalic.ttf"
import LatoRegularTtf from "../../assets/fonts/lato/Lato-Regular.ttf"
import LatoThinTtf from "../../assets/fonts/lato/Lato-Thin.ttf"
import LatoThinItalicTtf from "../../assets/fonts/lato/Lato-ThinItalic.ttf"


// eot- /* IE9 Compat Modes*/
// otf- /* Open Type Font */
// svg- /* Legacy iOS */
// ttf- /* Safari, Android, iOS */
// woff- /* Modern Browsers */
// woff2- /* Modern Browsers */

export function CssBaseLine(): Components {
  return {
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
                font-family: "Noe Display";
                src: url(${LatoRegularTtf as string}); 
                font-weight: 500;
                font-style: normal;
            }
            
            @font-face {
                font-family: "Noe Display";
                src: url(${LatoBoldTtf as string}); 
                font-weight: 700;
                font-style: normal;
            }
            
            @font-face {
                font-family: "Noe Display";
                src: url(${LatoBlackItalicTtf as string}); 
                font-weight: 700;
                font-style: italic;
            }
        `,
    },
  }
}

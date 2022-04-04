import { Components, styled, Theme } from '@mui/material'

// const BpIcon = styled('span')(({ theme }) => ({
//   width: 30,
//   height: 30,
//   border: '2px solid #FFF',
//   borderRadius: 12,
//   boxShadow:
//     theme.palette.mode === 'dark'
//       ? '0 0 0 1px rgb(16 22 26 / 40%)'
//       : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
//   backgroundColor: theme.palette.background.default,
//   backgroundImage:
//     theme.palette.mode === 'dark'
//       ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
//       : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
//   'input:hover ~ &': {
//     backgroundColor: theme.palette.primary.dark,
//   },
//   'input:disabled ~ &': {
//     boxShadow: 'none',
//     background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
//   },
// }))

// const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
//   '&:before': {
//     display: 'block',
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     content: '""',
//   },
//   'input:hover ~ &': {
//     backgroundColor: theme.palette.primary.main,
//   },
// }))
export default function CheckboxTheme(theme: Theme): Components {
  return {
    MuiCheckbox: {
      defaultProps: {
        disableTouchRipple: true,
        disableFocusRipple: true,
        disableRipple: true,
       // icon: <BpIcon />,
       // checkedIcon: <BpCheckedIcon />,
      },
      styleOverrides: {
        root: {},
        checked: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  }
}

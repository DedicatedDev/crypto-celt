import { Components, Theme } from '@mui/material'
import { merge } from 'lodash'
import AppbarTheme from './AppbarTheme'
import ButtonTheme from './ButtonTheme'
import CheckboxTheme from './CheckboxTheme'
import ChipTheme from './ChipTheme'
import IconButtonTheme from './IconButtonTheme'
import SliderTheme from './SliderTheme'
import TextFieldTheme from './TextFieldTheme'

export default function componentOverrides(theme: Theme): Components {
  return merge(
    AppbarTheme(theme),
    ButtonTheme(theme),
    CheckboxTheme(theme),
    IconButtonTheme(theme),
    SliderTheme(theme),
    TextFieldTheme(theme),
    ChipTheme(theme)
  ) as Components
}

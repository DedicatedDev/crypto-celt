import { createContext, PropsWithChildren } from 'react'
import { SettingsContextProps, ThemeMode } from '../@types/settings'
import useLocalStorage from '../hooks/useLocalStorage'

const initialState: SettingsContextProps = {
  themeMode: 'dark',
  onChangeMode: () => {},
}
const SettingsContext = createContext(initialState)

function SettingsProvider({ children }: PropsWithChildren<unknown>) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: 'dark',
  })

  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as ThemeMode,
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onChangeMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider, SettingsContext }

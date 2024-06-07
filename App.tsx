import { Loading } from '@components/Loading'
import { AuthContextProvider } from '@contexts/AuthContext'
import { ExpenseContextProvider } from '@contexts/ExpenseContext'
import { Roboto_400Regular, Roboto_700Bold, Roboto_900Black, useFonts } from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'
import { useEffect } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { THEME } from 'src/theme'
import { Routes } from './src/routes'


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold, Roboto_900Black })

  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.'])
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    LogBox.ignoreLogs([
      'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues'
    ])
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <ExpenseContextProvider>
          {fontsLoaded ? <Routes/> : <Loading/>}
        </ExpenseContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}

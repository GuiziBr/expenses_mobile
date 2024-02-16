import { Loading } from '@components/Loading'
import { Roboto_400Regular, Roboto_700Bold, useFonts, Roboto_900Black } from '@expo-google-fonts/roboto'
import { SignIn } from '@screens/SignIn'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'
import { THEME } from 'src/theme'


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold, Roboto_900Black })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignIn/> : <Loading/>}
    </NativeBaseProvider>
  )
}

import Logo from '@assets/logo.png'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { AntDesign, Feather } from '@expo/vector-icons'
import { Center, Heading, Image, KeyboardAvoidingView, ScrollView, VStack } from 'native-base'
import { Platform } from 'react-native'

export function SignIn() {
  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack flex={1} bg={'blue.600'} px={12} pb={16}>
          <Center marginTop={48}>
            <Image
              source={Logo}
              alt='Logo'
              size={'xl'}
            />
          </Center>
          <Center>
            <Heading
              marginTop={16}
              marginBottom={6}
              fontFamily={'heading'}
              color={'white.100'}
            >
            Expenses Portal
            </Heading>
            <AntDesign
              size={32}
              color={'white'}
            />
            <Input
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              icon={AntDesign}
              iconName='mail'
            />
            <Input
              placeholder='Password'
              secureTextEntry
              icon={Feather}
              iconName='lock'
            />
            <Button title='Login'/>
          </Center>
        </VStack>
      </ScrollView>

    </KeyboardAvoidingView>

  )
}
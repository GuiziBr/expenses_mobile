import Logo from '@assets/logo.png'
import { Input } from '@components/Input'
import { Center, Heading, Image, VStack } from 'native-base'

export function SignIn() {
  return (
    <VStack flex={1} bg={'blue.600'} px={12}>
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
        <Input placeholder='E-mail' keyboardType='email-address' autoCapitalize='none'/>
        <Input placeholder='Password' secureTextEntry/>
      </Center>
    </VStack>
  )
}
import Logo from '@assets/logo.png'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { Center, Heading, Image, KeyboardAvoidingView, ScrollView, VStack, useToast } from 'native-base'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Platform } from 'react-native'

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors }} = useForm<FormData>()

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error signing in. Try again.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

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
              marginTop={12}
              fontFamily={'heading'}
              color={'white.100'}
            >
            Expenses Portal
            </Heading>
            <AntDesign
              size={32}
              color={'white'}
            />
            <Controller
              control={control}
              name='email'
              rules={{ required: 'E-mail is required' }}
              render={({ field: { onChange }}) => (
                <Input
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  icon={AntDesign}
                  iconName='mail'
                  errorMessage={errors.email?.message}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name='password'
              rules={{ required: 'Password is required' }}
              render={({ field: { onChange }}) => (
                <Input
                  placeholder='Password'
                  secureTextEntry
                  icon={Feather}
                  iconName='lock'
                  errorMessage={errors.password?.message}
                  onChangeText={onChange}
                />
              )}
            />
            <Button
              title='Login'
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
              mt={1}
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
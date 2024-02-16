import { IInputProps, Input as NativeBaseInput } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg='blue.700'
      h={16}
      px={4}
      borderWidth={0}
      fontSize={'md'}
      color='white.200'
      fontFamily={'body'}
      mb={4}
      placeholderTextColor={'gray.500'}
      _focus={{ bg: 'blue.700', borderWidth: 1, borderColor: 'orange.700' }}
      {...rest}
    />
  )
}
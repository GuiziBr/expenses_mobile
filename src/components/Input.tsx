import { FormControl, HStack, IInputProps, Icon, Input as NativeBaseInput } from 'native-base'
import { useCallback, useState } from 'react'

type InputProps = IInputProps & {
  icon?: unknown
  iconName?: string
  errorMessage?: string | null
}


export function Input({ errorMessage, isInvalid, icon, iconName,...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid

  const [isFocused, setIsFocused] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  },[])

  return (
    <FormControl isInvalid={invalid}>
      <HStack
        bg={'blue.700'}
        h={16}
        px={4}
        mb={4}
        borderRadius={'sm'}
        alignItems={'center'}
        {...isFocused && { borderColor: 'orange.700', borderWidth: 1 }}

      >
        {icon &&
        <Icon
          as={icon}
          {...isFocused && { color: 'orange.700' }}
          size={'md'}
          name={iconName}
        />
        }

        <NativeBaseInput
          flex={1}
          borderWidth={0}
          fontSize={'md'}
          color='white.200'
          fontFamily={'body'}
          placeholderTextColor={'gray.500'}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          _focus={{ bg: 'blue.700' }}
          {...rest}
        />

        <FormControl.ErrorMessage _text={{ color: 'red.700' }}>
          {errorMessage}
        </FormControl.ErrorMessage>

      </HStack>
    </FormControl>
  )
}
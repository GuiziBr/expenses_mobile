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
    <FormControl>
      <HStack
        bg={'blue.700'}
        h={16}
        px={4}
        mb={2}
        borderRadius={'sm'}
        alignItems={'center'}
        {...invalid && { borderColor: 'red.700', borderWidth: 1 }}
        {...isFocused && { borderColor: 'orange.700', borderWidth: 1 }}
        display={'flex'}
        justifyContent={'center'}
      >
        {icon && (
          <Icon
            as={icon}
            {...isFocused && { color: 'orange.700' }}
            size={'md'}
            name={iconName}
          />
        )}

        <NativeBaseInput
          flex={1}
          borderWidth={0}
          fontSize={'md'}
          color='orange.700'
          fontFamily={'body'}
          placeholderTextColor={'gray.500'}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          _focus={{ bg: 'blue.700' }}
          {...rest}
        />
      </HStack>
    </FormControl>
  )
}
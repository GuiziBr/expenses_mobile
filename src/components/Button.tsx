import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
  isLoading?: boolean
  isLoadingText?: string
}

export function Button({ title, isLoading, isLoadingText,...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      w={'full'}
      h={16}
      bg={'orange.700'}
      rounded={'sm'}
      _pressed={{ bg: 'orange.500' }}
      isLoading={isLoading}
      isLoadingText={isLoadingText}
      spinnerPlacement='end'
      {...rest}
    >
      <Text color={'blue.600'} fontFamily={'heading'} fontSize={'md'}>
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
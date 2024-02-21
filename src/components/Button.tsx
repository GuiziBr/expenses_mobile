import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      w={'full'}
      h={16}
      bg={'orange.700'}
      rounded={'sm'}
      _pressed={{ bg: 'orange.500' }}
      {...rest}
    >
      <Text color={'blue.600'} fontFamily={'heading'} fontSize={'md'}>
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
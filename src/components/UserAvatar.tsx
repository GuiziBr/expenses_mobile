import { Image, IImageProps } from 'native-base'

type UserAvatarProps = IImageProps & {
  size: number
}

export function UserAvatar({ size, ...rest }: UserAvatarProps) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.300"
      {...rest}
    />
  )
}
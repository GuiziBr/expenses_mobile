import { HStack, Heading, IIconProps, Icon, VStack } from 'native-base'

type Props = IIconProps & {
  icon?: unknown
  iconName?: string
  iconColor?: string
  cardBackgroundColor: string
  fontTextColor: string
  cardText: string
  cardTitle: string
}

export function Card({
  icon,
  iconName,
  iconColor,
  cardBackgroundColor,
  fontTextColor,
  cardText,
  cardTitle
}: Props) {
  return (
    <VStack
      bgColor={cardBackgroundColor}
      h="20"
      justifyContent="space-evenly"
      px={2.5}
      borderRadius="md"
      w="32%"
    >
      <HStack
        alignItems='center'
        justifyContent="space-between"
      >
        <Heading
          flex={1}
          fontSize="sm"
          color={fontTextColor}
          fontFamily={'heading'}
        >
          {cardTitle}
        </Heading>
        <Icon
          as={icon}
          name={iconName}
          color={iconColor}
          size="sm"
        />
      </HStack>
      <Heading color={fontTextColor} fontFamily={'body'}>{cardText}</Heading>
    </VStack>
  )
}
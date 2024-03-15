import { HStack, Heading, IStackProps, Icon, VStack } from 'native-base'
import { Loading } from './Loading'

type Props = IStackProps & {
  icon?: unknown
  iconName?: string
  iconColor?: string
  cardBackgroundColor: string
  fontTextColor: string
  cardText: string
  cardTitle: string
  headingTextColor: string
  isLoading?: boolean
}

export function BalanceCard({
  icon,
  iconName,
  iconColor,
  cardBackgroundColor,
  fontTextColor,
  cardText,
  cardTitle,
  headingTextColor,
  isLoading,
  ...rest
}: Props) {

  return (
    <VStack
      bgColor={cardBackgroundColor}
      h="20"
      justifyContent="space-evenly"
      px={2.5}
      borderRadius="md"
      minWidth={32}
      {...rest}
    >
      <HStack
        alignItems='center'
        justifyContent="center"
      >
        <Heading
          flex={1}
          fontSize="sm"
          color={headingTextColor}
          fontFamily={'heading'}
        >
          {cardTitle}
        </Heading>
        {icon && (
          <Icon
            as={icon}
            name={iconName}
            color={iconColor}
            size="sm"
          />
        )}
      </HStack>
      {isLoading ? <Loading /> : (
        <Heading color={fontTextColor} fontFamily={'body'}>{cardText}</Heading>
      )}
    </VStack>
  )
}
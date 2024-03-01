import { Center, HStack, Text } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  description: string
  category: string
  amount: string
}

export function ExpenseCard({ description, category, amount, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} >
      <HStack
        bg="white.100"
        mx={1}
        h={12}
        borderRadius="md"
        mb={2}
      >
        <Center
          borderRightWidth={1}
          borderRightColor="blue.200"
          width="33%"
          alignItems="flex-start"
          pl={3}
          justifyContent="center"
        >
          <Text numberOfLines={1} fontSize="md">{description}</Text>
        </Center>

        <Center
          borderRightWidth={1}
          borderRightColor="blue.200"
          width="33%"
          alignItems="flex-start"
          pl={3}
        >
          <Text numberOfLines={1} fontSize="md">{category}</Text>
        </Center>

        <Center
          borderRightWidth={1}
          borderRightColor="blue.200"
          width="33%"
          alignItems="flex-start"
          pl={3}
        >
          <Text numberOfLines={1} fontSize="md" color="green">{amount}</Text>
        </Center>
      </HStack>
    </TouchableOpacity>
  )
}
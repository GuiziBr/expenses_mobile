import { FormattedExpense } from '@dtos/ExpenseDTO'
import { AntDesign } from '@expo/vector-icons'
import { Center, HStack, Icon, Text } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  expense: FormattedExpense
}


export function ExpenseCard({ expense, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} >
      <HStack
        bg="white.100"
        mb={'.5'}
        maxWidth={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
      >

        <Center
          alignItems="flex-start"
          justifyContent="center"
          pl={3}
          pt={4}
          pb={4}
        >
          <Text numberOfLines={1} fontSize="20">{expense.description}</Text>
          <Text fontSize="18" color={'gray.300'}>{expense.category}</Text>
          <Text fontSize="18" color={'gray.300'}>{expense.formattedDueDate}</Text>
        </Center>

        <Center
          display={'flex'}
          flexDirection={'row'}
          pr={3}

        >
          <Text
            numberOfLines={1}
            fontSize="22"
            color={expense.type === 'outcome' ? 'red.700' : 'green'}
          >
            {expense.formattedAmount}
          </Text>
          <Icon
            as={AntDesign}
            name='right'
            size="6"
            ml={1}
          />
        </Center>

      </HStack>
    </TouchableOpacity>
  )
}
import { FormattedExpense } from '@dtos/ExpenseDTO'
import { AntDesign } from '@expo/vector-icons'
import { Center, HStack, Icon, Text } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ExpenseCardProps = TouchableOpacityProps & {
  expense: FormattedExpense
  openExpenseModal: (expense: FormattedExpense) => void
}

export function ExpenseCard({ openExpenseModal, expense, ...rest }: ExpenseCardProps) {

  return (
    <TouchableOpacity onPress={() => openExpenseModal(expense)} { ...rest} >
      <HStack
        bg="white.100"
        maxWidth={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        backgroundColor={'blue.600'}
        borderBottomWidth={.2}
        borderBottomColor={'white.100'}
      >

        <Center
          alignItems="flex-start"
          justifyContent="center"
          pl={3}
          pt={4}
          pb={4}
        >
          <Text numberOfLines={1} fontSize="20" color={'white.200'}>{expense.description}</Text>
          <Text fontSize="18" color={'gray.300'}>{expense.category}</Text>
          <Text fontSize="18" color={'gray.300'}>{expense.formattedDate}</Text>
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
            color={'gray.300'}
          />
        </Center>

      </HStack>
    </TouchableOpacity>
  )
}
import { FormattedExpense } from '@dtos/ExpenseDTO'
import { FlatList, VStack } from 'native-base'
import { ExpenseCard } from './ExpenseCard'
import { ExpenseTableHeader } from './ExpenseTableHeader'

const TABLE_HEADER_CONTENT = ['Expense', 'Category', 'Amount']

function handleSortTable(sortBy: string) {
  console.log('sortBy', sortBy)
}

type ExpenseTableProps = {
  expenses: FormattedExpense[]
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {

  return (
    <VStack flex={1} mb={5} >
      <ExpenseTableHeader
        content={TABLE_HEADER_CONTENT}
        onPress={handleSortTable}
      />

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            description={item.description}
            category={item.category}
            amount={item.formattedAmount}
          />
        )}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ mt: 2 }}
      />

    </VStack>
  )
}
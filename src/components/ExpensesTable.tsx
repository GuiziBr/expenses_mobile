import { Filters } from '@contexts/ExpenseContext'
import { FormattedExpense } from '@dtos/ExpenseDTO'
import { FlatList, VStack } from 'native-base'
import { ExpenseCard } from './ExpenseCard'
import { ExpenseTableHeader } from './ExpenseTableHeader'
import { Loading } from './Loading'

function handleSortTable(sortBy: string) {
  console.log('sortBy', sortBy)
}

type ExpenseTableProps = {
  filters: Filters
  expenses: FormattedExpense[]
  onEndReached: () => void
  isLoading: boolean
}

export function ExpensesTable({ expenses, onEndReached, isLoading }: ExpenseTableProps) {
  return (
    <VStack flex={1}>
      <ExpenseTableHeader
        content={['Expense', 'Category', 'Amount']}
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
        _contentContainerStyle={{ mt: 2 }}
        ListFooterComponent={() => isLoading && <Loading />}
        onEndReached={onEndReached}
        onEndReachedThreshold={.5}
      />


    </VStack>
  )
}
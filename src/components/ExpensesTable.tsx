import { FormattedExpense } from '@dtos/ExpenseDTO'
import { FlatList, VStack } from 'native-base'
import { ExpenseCard } from './ExpenseCard'
import { Loading } from './Loading'

type ExpenseTableProps = {
  expenses: FormattedExpense[]
  onEndReached: () => void
  isLoading: boolean
}

export function ExpensesTable({ expenses, onEndReached, isLoading }: ExpenseTableProps) {
  return (
    <VStack flex={1}>
      {expenses.length === 0 ? <Loading /> : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (<ExpenseCard expense={item}/>)}
          ListFooterComponent={() => isLoading && <Loading />}
          onEndReached={onEndReached}
          onEndReachedThreshold={.5}
        />

      )}
    </VStack>
  )
}
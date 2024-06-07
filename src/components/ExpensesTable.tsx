import { FormattedExpense } from '@dtos/ExpenseDTO'
import { FlatList, VStack } from 'native-base'
import { useState } from 'react'
import { ExpenseCard } from './ExpenseCard'
import { ExpenseDetailsModal } from './ExpenseDetailsModal'
import { Loading } from './Loading'

type ExpenseTableProps = {
  expenses: FormattedExpense[]
  onEndReached: () => void
  isLoading: boolean
}

export function ExpensesTable({ expenses, onEndReached, isLoading }: ExpenseTableProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentExpense, setCurrentExpense] = useState<FormattedExpense>()

  function openExpenseModal(expense: FormattedExpense) {
    setCurrentExpense(expense)
    setIsModalVisible(true)
  }

  return (
    <VStack flex={1}>
      {expenses.length === 0 && isLoading ? <Loading /> : (
        <>
          <FlatList
            data={expenses}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExpenseCard expense={item} openExpenseModal={openExpenseModal}/>
            )}
            ListFooterComponent={() => isLoading && <Loading />}
            onEndReached={onEndReached}
            onEndReachedThreshold={.2}
          />
          {!!currentExpense && (
            <ExpenseDetailsModal
              isVisible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              expense={currentExpense}
            />
          )}
        </>
      )}
    </VStack>
  )
}
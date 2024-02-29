import { VStack } from 'native-base'
import { ExpenseTableHeader } from './ExpenseTableHeader'
import { ExpenseCard } from './ExpenseCard'

const TABLE_HEADER_CONTENT = ['Expense', 'Category', 'Amount', 'Purchase']

function handleSortTable(sortBy: string) {
  console.log('sortBy', sortBy)
}

export function ExpenseTable() {

  return (
    <VStack flex={1} mb={5} >
      <ExpenseTableHeader
        content={TABLE_HEADER_CONTENT}
        onPress={handleSortTable}
      />

      {/* <ExpenseCard/> */}
    </VStack>
  )
}
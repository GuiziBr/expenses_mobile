import { FlatList, VStack } from 'native-base'
import { ExpenseCard } from './ExpenseCard'
import { ExpenseTableHeader } from './ExpenseTableHeader'

const TABLE_HEADER_CONTENT = ['Expense', 'Category', 'Amount']

const EXPENSES = [{
  id: '1',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '2',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
}, {
  id: '3',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '4',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '5',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '6',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '7',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '8',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '9',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '10',
  description: 'Towel hander',
  category: 'Restaurant',
  amount: '$200.99'
},
{
  id: '11',
  description: 'Towel hander',
  category: 'fkasdkljfsdkl',
  amount: '$200.99'
}
]

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

      <FlatList
        data={EXPENSES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            description={item.description}
            category={item.category}
            amount={item.amount}
          />
        )}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ mt: 2 }}

      />

    </VStack>
  )
}
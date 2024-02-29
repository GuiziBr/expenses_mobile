import { HStack } from 'native-base'

type Expense =  {
  id: string
  description: string
  category: string
  amount: number
  formattedAmount: string
  formattedDate: string
  type: 'income' | 'outcome'
  date: Date
  paymentType: string
  bank?: string
  store?: string
  dueDate: Date
  formattedDueDate?: string
  mobileFormatDate: string
  mobileFormatDueDate?: string
}

export function ExpenseCard() {
  return (
    <HStack/>
  )
}
import { Expense, FormattedExpense } from '@dtos/ExpenseDTO'
import { formatAmount } from './formatAmount'
import { formatDate } from './formatDate'

export const assemblePersonalExpense = (expense: Omit<Expense, 'type'>): Omit<FormattedExpense, 'type'> => ({
  id: expense.id,
  description: expense.description,
  category: expense.category.description,
  amount: expense.amount,
  formattedAmount: formatAmount(expense.amount),
  formattedDate: formatDate(expense.date),
  date: expense.date,
  paymentType: expense.payment_type.description,
  bank: expense.bank?.name,
  store: expense.store?.name,
  dueDate: expense.due_date,
  formattedDueDate: expense.due_date && formatDate(expense.due_date),
  mobileFormatDate: formatDate(expense.date, false),
  mobileFormatDueDate: expense.due_date && formatDate(expense.due_date, false),
})
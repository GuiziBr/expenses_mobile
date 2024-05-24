import { Expense, FormattedExpense } from '@dtos/ExpenseDTO'
import { formatAmount } from './formatAmount'
import { formatDate } from './formatDate'

export const assemblePersonalExpense = (expense: Expense): FormattedExpense => ({
  id: expense.id,
  description: expense.description,
  category: expense.category.description,
  amount: expense.amount,
  formattedAmount: formatAmount(expense.amount),
  formattedDate: formatDate(expense.date, true),
  date: expense.date,
  paymentType: expense.payment_type.description,
  bank: expense.bank?.name,
  store: expense.store?.name,
  dueDate: expense.due_date,
  formattedDueDate: expense.due_date && formatDate(expense.due_date),
  type: expense.type
})

export const assembleSharedExpense = (expense: Expense): FormattedExpense => ({
  id: expense.id,
  description: expense.description,
  category: expense.category.description,
  amount: expense.amount,
  formattedAmount: `${expense.type === 'outcome' ? '- ' : ''}${formatAmount(expense.amount)}`,
  formattedDate: formatDate(expense.date, true),
  date: expense.date,
  paymentType: expense.payment_type.description,
  bank: expense.bank?.name,
  store: expense.store?.name,
  dueDate: expense.due_date,
  formattedDueDate: expense.due_date && formatDate(expense.due_date),
  type: expense.type
})
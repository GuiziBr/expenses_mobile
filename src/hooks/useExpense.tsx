import { ExpenseContext } from '@contexts/ExpenseContext'
import { useContext } from 'react'

export function useExpense() {
  const context = useContext(ExpenseContext)
  return context
}
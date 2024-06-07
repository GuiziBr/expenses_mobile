export type OrderByTypes = {
  orderBy: string
  orderType: 'asc' | 'desc'
  isCurrent?: boolean
}

export type Expense = {
  id: string
  description: string
  category: { description: string }
  amount: number
  type: 'income' | 'outcome'
  date: Date
  'payment_type': { description: string }
  bank?: { name: string }
  store?: { name: string }
  'due_date': Date
}

export type FormattedExpense = {
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
  formattedDueDate: string
}

export type Category = {
  id: string
  description: string
}

export type PaymentType = {
  id: string
  description: string
}

export type Bank = {
  id: string
  name: string
}

export type Store = {
  id: string
  name: string
}

export type BalanceState = {
  personalBalance: number
  sharedBalance: {
    total: number
    paying: number
    payed: number
  }
}
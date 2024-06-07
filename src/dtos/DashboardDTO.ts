export type FilterValues = {
  id: string
  description: string
  name: string
}

export type OrderTypes = {
  orderBy: string
  orderType: 'asc' | 'desc'
  isCurrent?: boolean
}

export type Filters = {
  startDate?: string
  endDate?: string
  filterBy?: string
  filterValue?: string
}

export type CurrentFilters = Omit<Filters, 'startDate' | 'endDate'> & {
  startDate: Date
  endDate: Date
}

type Category = {
  id: string
  description: string
  total: number
}

type Bank = {
  id: string
  name: string
  total: number
}

type Payment = {
  id: string
  description: string
  banks: Array<Bank>
  total: number
}

type Report = {
  id: string
  name?: string
  payments?: Array<Payment>
  categories?: Array<Category>
  total: number
}

export type BalanceReport = {
  requester: Report
  partner?: Report
  balance: number
}
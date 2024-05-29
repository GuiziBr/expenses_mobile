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
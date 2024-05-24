export type FilterValue = {
  id: string
  description: string
  name: string
}

export type OrderTypes = {
  orderBy: string
  orderType: 'asc' | 'desc'
  isCurrent?: boolean
}
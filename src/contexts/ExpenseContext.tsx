import { api } from '@services/api'
import { AxiosRequestConfig } from 'axios'
import { format } from 'date-fns'
import { ReactNode, createContext, useCallback, useState } from 'react'

type BalanceState = {
  personalBalance: number
  sharedBalance: {
    total: number
    paying: number
    payed: number
  }
}

export type Filters = {
  startDate?: string
  endDate?: string
  filterBy?: string
  filterValue?: string
}

type ExpenseContextProviderProps = {
  children: ReactNode
}

export type ExpenseContextDataProps = {
  balance: BalanceState
  getBalance:(filters: Filters) => Promise<void>
}

export const ExpenseContext = createContext<ExpenseContextDataProps>({} as ExpenseContextDataProps)

export function ExpenseContextProvider({ children }: ExpenseContextProviderProps) {

  const [balance, setBalance] = useState<BalanceState>(
    { personalBalance: 0, sharedBalance: { total: 0, paying: 0, payed: 0 }}
  )

  const defaultDate = format(new Date(), 'yyyy-MM-dd')

  const getBalance = useCallback(async ({ startDate, endDate = defaultDate, filterBy, filterValue }: Filters) => {
    const params = {
      ...startDate && { startDate },
      ...endDate && { endDate },
      ...filterBy && { filterBy, filterValue },
    }
    const config: AxiosRequestConfig = { params }
    const response = await api.get('/balance', config)
    const { data: { personalBalance, sharedBalance }} = response
    setBalance({ personalBalance, sharedBalance })

  }, [])

  return (
    <ExpenseContext.Provider value={{ balance, getBalance }}>
      {children}
    </ExpenseContext.Provider>
  )

}
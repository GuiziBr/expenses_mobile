import { BalanceCard } from '@components/BalanceCard'
import { ExpenseTable } from '@components/ExpenseTable'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'
import { Filters } from '@contexts/ExpenseContext'
import { FormattedExpense } from '@dtos/ExpenseDTO'
import { Entypo, FontAwesome6 } from '@expo/vector-icons'
import { useExpense } from '@hooks/useExpense'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { assemblePersonalExpense } from '@utils/expenseAssemblers'
import { formatAmount } from '@utils/formatAmount'
import { AxiosRequestConfig } from 'axios'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { Center, HStack, VStack, useToast } from 'native-base'
import { useCallback, useMemo, useState } from 'react'

export function SharedDashboard() {

  const endOfMonthDate = format(endOfMonth(new Date()), 'yyyy-MM-dd')

  const [isLoading, setIsLoading] = useState(false)
  const [currentFilters, setCurrentFilter] = useState<Filters>({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: endOfMonthDate
  })
  const [expenses, setExpenses] = useState<FormattedExpense[]>([])
  const [currentPage, setCurrentPage] = useState<number | null>(null)

  const toast = useToast()
  const { balance, getBalance } = useExpense()

  const offset = useMemo(() => ((currentPage || 1) * 20) - 20, [currentPage])

  const loadExpenses = async(filters?: Filters): Promise<void> => {
    const config: AxiosRequestConfig = {
      params: {
        ...filters?.startDate && { startDate: filters.startDate },
        ...filters?.endDate && { endDate: filters.endDate },
        offset,
        limit: 20,
      },
    }
    const { data } = await api.get('/expenses/shared', config)
    setExpenses(data.map(assemblePersonalExpense))
  }

  async function loadDashboard(): Promise<void> {
    try {
      setIsLoading(true)
      await Promise.all([
        getBalance(currentFilters),
        loadExpenses(currentFilters)
      ])

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error loading expenses. Try again.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    loadDashboard()
  }, []))

  return (
    <VStack flex={1}>
      <HomeHeader/>
      {
        isLoading
          ?
          <Center flex={1}>
            <Loading/>
          </Center>
          :
          <>
            <HStack justifyContent="space-evenly" mt="-10" mb={5}>
              <BalanceCard
                cardTitle="Incomes"
                cardText={formatAmount(balance.sharedBalance.paying)}
                cardBackgroundColor="white.100"
                fontTextColor="blue.800"
                icon={Entypo}
                iconName="arrow-with-circle-up"
                iconColor="green"
                headingTextColor='blue.800'
              />
              <BalanceCard
                cardTitle="Outcomes"
                cardText={formatAmount(balance.sharedBalance.payed)}
                cardBackgroundColor="white.100"
                fontTextColor="blue.800"
                icon={Entypo}
                iconName="arrow-with-circle-down"
                iconColor="red.500"
                headingTextColor='blue.800'
              />
              <BalanceCard
                cardTitle="Balance"
                cardText={formatAmount(balance.sharedBalance.total)}
                cardBackgroundColor='orange.500'
                fontTextColor="white.100"
                icon={FontAwesome6}
                iconName="dollar"
                iconColor="white.100"
                headingTextColor='white.100'
              />
            </HStack>
            <ExpenseTable expenses={expenses}/>
          </>
      }

    </VStack>
  )
}
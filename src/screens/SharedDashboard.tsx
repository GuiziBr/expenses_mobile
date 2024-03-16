import { BalanceCard } from '@components/BalanceCard'
import { ExpensesTable } from '@components/ExpensesTable'
import { HomeHeader } from '@components/HomeHeader'
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
import { HStack, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'

export function SharedDashboard() {
  const endOfMonthDate = format(endOfMonth(new Date()), 'yyyy-MM-dd')

  const [isLoading, setIsLoading] = useState(false)
  const [isBalanceLoading, setIsBalanceLoading] = useState(false)
  const [currentFilters, setCurrentFilter] = useState<Filters>({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: endOfMonthDate
  })
  const [expenses, setExpenses] = useState<FormattedExpense[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)

  const { balance, getBalance } = useExpense()
  const toast = useToast()

  const loadExpenses = async(isInitialLoad?: boolean): Promise<void> => {
    try {
      setIsLoading(true)

      const config: AxiosRequestConfig = {
        params: {
          ...currentFilters?.startDate && { startDate: currentFilters.startDate },
          ...currentFilters?.endDate && { endDate: currentFilters.endDate },
          offset: isInitialLoad ? 0 : expenses.length,
          limit: 20,
        },
      }
      const { data, headers } = await api.get('/expenses/shared', config)

      setTotalCount(Number(headers['x-total-count']))

      if(isInitialLoad) {
        setExpenses(data.map(assemblePersonalExpense))
      } else {
        setExpenses((existingExpenses) => [...existingExpenses, ...data.map(assemblePersonalExpense)])
      }

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

  async function loadDashboard(): Promise<void> {
    try {
      setIsBalanceLoading(true)

      await Promise.all([
        getBalance(currentFilters),
        loadExpenses(true)
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
      setIsBalanceLoading(false)
    }
  }

  async function loadNextExpenses() {
    if(isLoading || expenses.length === totalCount) return
    await loadExpenses(false)
  }


  useFocusEffect(useCallback(() => {
    loadDashboard()
  }, []))

  return (
    <VStack flex={1}>
      <HomeHeader/>
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
          isLoading={isBalanceLoading}
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
          isLoading={isBalanceLoading}
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
          isLoading={isBalanceLoading}
        />
      </HStack>
      <ExpensesTable
        expenses={expenses}
        isLoading={isLoading}
        onEndReached={loadNextExpenses}
        filters={currentFilters}
      />
    </VStack>

  )
}
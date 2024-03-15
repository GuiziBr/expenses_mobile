import { BalanceCard } from '@components/BalanceCard'
import { ExpenseCard } from '@components/ExpenseCard'
import { ExpenseTableHeader } from '@components/ExpenseTableHeader'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'
import { Filters } from '@contexts/ExpenseContext'
import { FormattedExpense } from '@dtos/ExpenseDTO'
import { FontAwesome6 } from '@expo/vector-icons'
import { useExpense } from '@hooks/useExpense'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { assemblePersonalExpense } from '@utils/expenseAssemblers'
import { formatAmount } from '@utils/formatAmount'
import { AxiosRequestConfig } from 'axios'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { FlatList, HStack, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'

export function PersonalDashboard() {
  const endOfMonthDate = format(endOfMonth(new Date()), 'yyyy-MM-dd')

  const [isLoading, setIsLoading] = useState(false)
  const [isDashboardLoading, setIsDashboardLoading] = useState(true)
  const [currentFilters, setCurrentFilter] = useState<Filters>({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: endOfMonthDate
  })
  const [expenses, setExpenses] = useState<FormattedExpense[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)

  const toast = useToast()
  const { balance, getBalance } = useExpense()

  const loadExpenses = async(): Promise<void> => {
    try {
      setIsLoading(true)

      const config: AxiosRequestConfig = {
        params: {
          ...currentFilters?.startDate && { startDate: currentFilters.startDate },
          ...currentFilters?.endDate && { endDate: currentFilters.endDate },
          offset: expenses.length,
          limit: 20,
        },
      }

      const { data, headers } = await api.get('/expenses/personal', config)

      setTotalCount(Number(headers['x-total-count']))

      setExpenses((existingExpenses) => [...existingExpenses, ...data.map(assemblePersonalExpense)])

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
      await Promise.all([
        getBalance(currentFilters),
        loadExpenses()
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
      setIsDashboardLoading(false)
    }
  }

  async function loadNextExpenses() {
    if(isLoading || expenses.length === totalCount) return
    await loadExpenses()
  }

  useFocusEffect(useCallback(() => {
    loadDashboard()
    return () => {
      setExpenses([])
      setIsLoading(true)
      setIsDashboardLoading(true)
    }
  }, []))

  return (
    <VStack flex={1}>
      <HomeHeader/>
      <HStack justifyContent="space-evenly" mt="-10" mb={5}>
        <BalanceCard
          cardTitle="Balance"
          cardText={formatAmount(balance.personalBalance)}
          cardBackgroundColor='orange.500'
          fontTextColor="white.100"
          icon={FontAwesome6}
          iconName="dollar"
          iconColor="white.100"
          headingTextColor='white.100'
          isLoading={isDashboardLoading}
        />
      </HStack>
      <VStack flex={1}>
        <ExpenseTableHeader
          content={['Expense', 'Category', 'Amount']}
          onPress={() => console.log('Sorting')}
        />
        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              description={item.description}
              category={item.category}
              amount={item.formattedAmount}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ mt: 2 }}
          ListFooterComponent={() => isLoading && <Loading />}
          onEndReached={loadNextExpenses}
          onEndReachedThreshold={1}
          // refreshing={isLoading}
          // onRefresh={() => console.log('REFRESH')}
        />


      </VStack>
    </VStack>
  )
}
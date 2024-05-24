import { BalanceCard } from '@components/BalanceCard'
import { ExpensesFilterModal } from '@components/ExpensesFilterModal'
import { ExpensesTable } from '@components/ExpensesTable'
import { HomeHeader } from '@components/HomeHeader'
import { Filters } from '@contexts/ExpenseContext'
import { OrderTypes } from '@dtos/DashboardDTO'
import { FormattedExpense } from '@dtos/ExpenseDTO'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { useExpense } from '@hooks/useExpense'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import constants from '@utils/constants'
import { assemblePersonalExpense } from '@utils/expenseAssemblers'
import { formatAmount } from '@utils/formatAmount'
import { AxiosRequestConfig } from 'axios'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { Fab, HStack, Icon, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'

export function PersonalDashboard() {
  const endOfMonthDate = format(endOfMonth(new Date()), 'yyyy-MM-dd')
  const startOfMonthDate = format(startOfMonth(new Date()), 'yyyy-MM-dd')

  const [isLoading, setIsLoading] = useState(false)
  const [isBalanceLoading, setIsBalanceLoading] = useState(false)

  const [expenses, setExpenses] = useState<FormattedExpense[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [currentFilters, setCurrentFilter] = useState<Filters>({} as Filters)
  // const [orderByColumns, setOrderByColumns] = useState<OrderByTypes[]>(
  //   constants.tableHeader.map(column => ({ orderBy: column.description, orderType: 'asc', isCurrent: false }))
  // )

  const { balance, getBalance } = useExpense()
  const toast = useToast()

  async function loadExpenses(isInitialLoad?: boolean, filters?: Filters, orderParams?: OrderTypes): Promise<void> {
    try {
      setIsLoading(true)

      const config: AxiosRequestConfig = {
        params: {
          startDate: filters?.startDate || startOfMonthDate,
          endDate: filters?.endDate || endOfMonthDate,
          ...filters?.filterBy && {
            filterBy: constants.filterValues[filters.filterBy as keyof typeof constants.filterValues],
            filterValue: filters.filterValue
          },
          ...orderParams && { ...orderParams },
          offset: isInitialLoad ? 0 : expenses.length,
          limit: 20,
        },
      }
      const { data, headers } = await api.get('/expenses/personal', config)

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
        getBalance({ startDate: startOfMonthDate, endDate: endOfMonthDate }),
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

  async function loadNextExpenses(): Promise<void> {
    if(isLoading || totalCount === expenses.length) return
    await loadExpenses(false, currentFilters)
  }

  async function handleFilterTable(selectedFilters: Filters): Promise<void> {
    await Promise.all([
      loadExpenses(true, selectedFilters),
      getBalance(selectedFilters),
    ])
    setCurrentFilter(selectedFilters)
  }

  // function getOrderByType(columnName: string): 'asc' | 'desc' {
  //   const currentOrder = orderByColumns.find((orderByColumn) => orderByColumn.orderBy === columnName)
  //   return currentOrder?.orderBy === 'asc' ? 'desc' : 'asc'

  // }

  // async function handleSortTable(columnName: string): Promise<void> {
  //   const orderParams: OrderTypes = { orderBy: columnName, orderType: getOrderByType(columnName) }
  // }

  useFocusEffect(useCallback(() => {
    setExpenses([])
    loadDashboard()
  }, []))

  return (
    <VStack flex={1}>
      <HomeHeader/>
      <HStack justifyContent="space-evenly" mt={-10} mb={2}>
        <BalanceCard
          cardTitle="Balance"
          cardText={formatAmount(balance.personalBalance)}
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
      />
      <Fab
        renderInPortal={false}
        placement='bottom-right'
        size={16}
        bg={'orange.700'}
        icon={<Icon as={Feather} name="menu" size="lg" color="white.100"/>}
        _pressed={{ bg: 'blue.800' }}
        onPress={() => setIsFilterVisible(true)}
      />
      <ExpensesFilterModal
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onSubmit={handleFilterTable}
        title='Personal Expenses'
      />
    </VStack>
  )
}
import { BalanceCard } from '@components/BalanceCard'
import { ExpenseTable } from '@components/ExpenseTable'
import { HomeHeader } from '@components/HomeHeader'
import { Filters } from '@contexts/ExpenseContext'
import { FontAwesome6 } from '@expo/vector-icons'
import { useExpense } from '@hooks/useExpense'
import { formatAmount } from '@utils/formatAmount'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { HStack, VStack } from 'native-base'
import { useEffect, useState } from 'react'

export function PersonalDashboard() {
  const endOfMonthDate = format(endOfMonth(new Date()), 'yyyy-MM-dd')
  const [currentFilters, setCurrentFilter] = useState<Filters>({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: endOfMonthDate
  })

  const { balance, getBalance } = useExpense()

  useEffect(() => {
    async function loadDashboard(): Promise<void> {
      await getBalance(currentFilters)
    }
    loadDashboard()
  },[])

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
        />
      </HStack>
      <ExpenseTable/>
    </VStack>
  )
}
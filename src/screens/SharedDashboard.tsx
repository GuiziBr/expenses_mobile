import { BalanceCard } from '@components/BalanceCard'
import { ExpenseTable } from '@components/ExpenseTable'
import { HomeHeader } from '@components/HomeHeader'
import { Filters } from '@contexts/ExpenseContext'
import { Entypo, FontAwesome6 } from '@expo/vector-icons'
import { useExpense } from '@hooks/useExpense'
import { formatAmount } from '@utils/formatAmount'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { HStack, VStack } from 'native-base'
import { useEffect, useState } from 'react'

export function SharedDashboard() {

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
      <ExpenseTable/>
    </VStack>
  )
}
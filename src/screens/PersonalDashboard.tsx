import { BalanceCard } from '@components/BalanceCard'
import { HomeHeader } from '@components/HomeHeader'
import { HStack, VStack } from 'native-base'
import { FontAwesome6 } from '@expo/vector-icons'
import { ExpenseTable } from '@components/ExpenseTable'

export function PersonalDashboard() {
  return (
    <VStack flex={1}>
      <HomeHeader/>
      <HStack justifyContent="space-evenly" mt="-10" mb={5}>
        <BalanceCard
          cardTitle="Balance"
          cardText="-$752.46"
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
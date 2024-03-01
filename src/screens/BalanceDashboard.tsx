import { BalanceCard } from '@components/BalanceCard'
import { HomeHeader } from '@components/HomeHeader'
import { Entypo, FontAwesome6 } from '@expo/vector-icons'
import { HStack, VStack } from 'native-base'

export function BalanceDashboard() {
  return (
    <VStack flex={1}>
      <HomeHeader/>
      <HStack justifyContent="space-evenly" mt="-10" mb={5}>
        <BalanceCard
          cardTitle="Ricardo Guizi"
          cardText="$752.46"
          cardBackgroundColor="white.100"
          fontTextColor="blue.800"
          icon={Entypo}
          iconName="arrow-with-circle-up"
          iconColor="green"
        />
        <BalanceCard
          cardTitle="Julia Luz"
          cardText="$752.46"
          cardBackgroundColor="white.100"
          fontTextColor="blue.800"
          icon={Entypo}
          iconName="arrow-with-circle-down"
          iconColor="red.500"
        />
        <BalanceCard
          cardTitle="Balance"
          cardText="-$752.46"
          cardBackgroundColor='orange.500'
          fontTextColor="white.100"
          icon={FontAwesome6}
          iconName="dollar"
          iconColor="white.100"
        />
      </HStack>

    </VStack>
  )
}

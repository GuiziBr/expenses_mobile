import { Card } from '@components/Card'
import { HomeHeader } from '@components/HomeHeader'
import { FontAwesome6 } from '@expo/vector-icons'
import { HStack, VStack } from 'native-base'

export function SharedDashboard() {
  return (
    <VStack flex={1}>
      <HomeHeader/>
      <HStack justifyContent="space-evenly" mt="-10">
        <Card
          cardTitle="Incomes"
          cardText="$752.46"
          cardBackgroundColor="white.100"
          fontTextColor="blue.800"
          icon={FontAwesome6}
          iconName="dollar"
          iconColor="green"
        />
        <Card
          cardTitle="Outcomes"
          cardText="$752.46"
          cardBackgroundColor="white.100"
          fontTextColor="blue.800"
          icon={FontAwesome6}
          iconName="dollar"
          iconColor="red.500"
        />
        <Card
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
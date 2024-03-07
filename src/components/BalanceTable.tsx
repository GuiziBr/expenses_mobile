import { FlatList, HStack, VStack, Text } from 'native-base'
import { BalanceCard } from './BalanceCard'

const ITEMS = [
  {
    description: 'Grocery',
    total: '$93.33'
  },
  {
    description: 'Restaurant',
    total: '$141.42'
  },
  {
    description: 'Fuel',
    total: '$40.36'
  },
  {
    description: 'Others',
    total: '$10.37'
  },
  {
    description: 'Pharmacy',
    total: '$19.48'
  },
  {
    description: 'Parking',
    total: '$3.30'
  },
]

export function BalanceTable() {
  return (
    <HStack px={2} justifyContent={'space-evenly'}>
      <VStack space={2} alignItems={'center'}>
        <Text color={'white.100'} fontSize={'md'}>Ricardo</Text>
        <FlatList
          data={ITEMS}
          keyExtractor={item => item.description}
          renderItem={({ item }) => (
            <BalanceCard
              cardTitle={item.description}
              cardText={item.total}
              cardBackgroundColor="white.100"
              fontTextColor="green"
              headingTextColor="blue.800"
              px={5}
              mb={2}
              width={40}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <VStack space={2} alignItems={'center'}>
        <Text color={'white.100'} fontSize={'md'}>Julia</Text>
        <FlatList
          data={ITEMS}
          keyExtractor={item => item.description}
          renderItem={({ item }) => (
            <BalanceCard
              cardTitle={item.description}
              cardText={item.total}
              cardBackgroundColor="white.100"
              fontTextColor="red.500"
              headingTextColor="blue.800"
              mb={2}
              width={40}
              px={5}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </HStack>
  )
}
import { BalanceReport } from '@dtos/DashboardDTO'
import { formatAmount } from '@utils/formatAmount'
import { FlatList, HStack, Text, VStack } from 'native-base'
import { BalanceCard } from './BalanceCard'

type BalanceTableProps = {
  balanceReport: BalanceReport
}

export function BalanceTable({ balanceReport }: BalanceTableProps) {
  return (
    <HStack px={2} justifyContent={'space-evenly'}>
      <VStack space={2} alignItems={'center'}>
        <Text color={'white.100'} fontSize={'md'}>Ricardo</Text>
        <FlatList
          data={balanceReport?.requester?.categories}
          keyExtractor={item => item.description}
          renderItem={({ item }) => (
            <BalanceCard
              cardTitle={item.description}
              cardText={formatAmount(item.total)}
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
          data={balanceReport?.partner?.categories}
          keyExtractor={item => item.description}
          renderItem={({ item }) => (
            <BalanceCard
              cardTitle={item.description}
              cardText={formatAmount(item.total)}
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
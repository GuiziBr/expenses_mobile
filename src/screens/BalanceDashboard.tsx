import { BalanceCard } from '@components/BalanceCard'
import { BalanceTable } from '@components/BalanceTable'
import { Button } from '@components/Button'
import { HomeHeader } from '@components/HomeHeader'
import { NewExpenseModal } from '@components/NewExpenseModal'
import { BalanceReport } from '@dtos/DashboardDTO'
import { Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { formatAmount } from '@utils/formatAmount'
import { Fab, FormControl, HStack, Icon, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'

export function BalanceDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [balanceDate, setBalanceDate] = useState<Date>(new Date())
  const [balanceReport, setBalanceReport] = useState<BalanceReport>({} as BalanceReport)
  const [isNewExpenseVisible, setIsNewExpenseVisible] = useState<boolean>(false)

  const toast = useToast()

  function handleOnChangeFilter(selectedDate?: Date): void {
    if(!selectedDate) return
    setBalanceDate(selectedDate)
  }

  async function handleSubmit(): Promise<void> {
    try {
      if(!balanceDate) return
      setIsLoading(true)
      const [year, month] = balanceDate.toISOString().split('-')
      const { data } = await api.get(`/balance/consolidated/${year}/${month}`)
      setBalanceReport(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error loading balance. Try again.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function handleCloseModal(shouldLoadExpenses?: boolean): Promise<void> {
    setIsNewExpenseVisible(false)
    if(shouldLoadExpenses) {
      await handleSubmit()
    }
  }

  useFocusEffect(useCallback(() => {
    setBalanceDate(new Date())
    setBalanceReport({} as BalanceReport)
  }, []))

  return (
    <VStack flex={1}>
      <HomeHeader/>
      <HStack px={2} justifyContent={'space-between'} mt="-10" mb={5}>
        <BalanceCard
          cardTitle={balanceReport?.requester?.name || 'Requester'}
          cardText={formatAmount(balanceReport?.requester?.total || 0)}
          cardBackgroundColor="white.100"
          fontTextColor="blue.800"
          icon={Entypo}
          iconName="arrow-with-circle-up"
          iconColor="green"
          headingTextColor="blue.800"
        />
        <BalanceCard
          cardTitle={balanceReport?.partner?.name || 'Partner'}
          cardText={formatAmount(balanceReport?.partner?.total || 0)}
          cardBackgroundColor="white.100"
          fontTextColor="blue.800"
          icon={Entypo}
          iconName="arrow-with-circle-down"
          iconColor="red.500"
          headingTextColor="blue.800"
        />
        <BalanceCard
          cardTitle="Balance"
          cardText={formatAmount(balanceReport?.balance || 0)}
          cardBackgroundColor='orange.500'
          fontTextColor="white.100"
          icon={FontAwesome6}
          iconName="dollar"
          iconColor="white.100"
          headingTextColor="white.100"
        />
      </HStack>
      <FormControl isRequired>
        <HStack h={10} justifyContent={'space-evenly'} mb={3}>
          <DateTimePicker
            onChange={(_, selectedDate) => handleOnChangeFilter(selectedDate)}
            accentColor='#FF9000'
            value={balanceDate}
            style={{ backgroundColor: 'transparent',  }}
            themeVariant='dark'
          />
          <Button
            onPress={handleSubmit}
            title='Search'
            isLoading={isLoading}
            width='40%'
            height={10}
          />
        </HStack>
      </FormControl>
      <BalanceTable balanceReport={balanceReport}/>
      <Fab
        renderInPortal={false}
        placement='bottom-right'
        size={16}
        bg={'orange.700'}
        icon={<Icon as={Ionicons} name="add" size="2xl" color="white.100"/>}
        _pressed={{ bg: 'blue.800' }}
        rounded={'2xl'}
        style={{
          width: 60,
          height: 60,
        }}
        onPress={() => setIsNewExpenseVisible(true)}
      />
      {isNewExpenseVisible && (
        <NewExpenseModal
          isVisible={isNewExpenseVisible}
          onClose={handleCloseModal}
        />
      )}
    </VStack>
  )
}

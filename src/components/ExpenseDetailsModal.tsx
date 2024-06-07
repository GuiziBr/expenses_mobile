import { FormattedExpense } from '@dtos/ExpenseDTO'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { HStack, Icon, Modal, Text, VStack } from 'native-base'

type ExpenseDetailsModalProps = {
  expense: FormattedExpense
  onClose: () => void
  isVisible: boolean
}

export function ExpenseDetailsModal({ isVisible, onClose, expense }: ExpenseDetailsModalProps) {
  return (
    <Modal isOpen={isVisible} onClose={onClose} animationPreset='slide'>
      <Modal.Content width={'100%'} maxWidth={'100%'} height={'480'} top={'64'}>
        <Modal.CloseButton/>
        <VStack mb={8}/>
        <Modal.Header>
          <VStack>
            <HStack display={'flex'} justifyContent={'space-between'}>
              <Text
                fontSize={'2xl'}
                color={'gray.500'}
                numberOfLines={1}
                maxW={270}
              >
                {expense.description}
              </Text>
              <Text
                fontSize={'lg'}
                color={!expense.type || expense.type === 'income' ? 'green' : 'red.500'}
              >
                {expense.formattedAmount}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize={'md'} color={'gray.300'}>{expense.category}</Text>
            </HStack>
          </VStack>
        </Modal.Header>
        <Modal.Body>
          <VStack>
            <HStack
              display={'flex'}
              alignItems={'center'}
              mb={4}
            >
              <Icon
                as={AntDesign}
                name='creditcard'
                size={'8'}
                mr={4}
              />
              <Text fontSize={'md'}>
                {expense.paymentType}
              </Text>
            </HStack>
            <HStack
              display={'flex'}
              alignItems={'center'}
              mb={4}
            >
              <Icon
                as={Feather}
                name='shopping-bag'
                size={'8'}
                mr={4}
              />
              <Text fontSize={'md'}>
                {expense.formattedDate}
              </Text>
            </HStack>
            <HStack
              display={'flex'}
              alignItems={'center'}
              mb={4}
            >
              <Icon
                as={MaterialCommunityIcons}
                name='cash-remove'
                size={'8'}
                mr={4}
              />
              <Text fontSize={'md'}>
                {expense.formattedDueDate}
              </Text>
            </HStack>

            <HStack
              display={'flex'}
              alignItems={'center'}
              mb={4}
            >
              <Icon
                as={FontAwesome}
                name='bank'
                size={'8'}
                mr={4}
              />
              <Text fontSize={'md'}>
                {expense.bank}
              </Text>
            </HStack>
            <HStack
              display={'flex'}
              alignItems={'center'}
              mb={4}
            >
              <Icon
                as={Ionicons}
                name='storefront-outline'
                size={'8'}
                mr={4}
              />
              <Text fontSize={'md'}>
                {expense.store}
              </Text>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
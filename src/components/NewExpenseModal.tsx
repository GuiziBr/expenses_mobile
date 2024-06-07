import { Bank, Category, PaymentType, Store } from '@dtos/ExpenseDTO'
import { Entypo, Feather, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import constants from '@utils/constants'
import { formatCurrency, unformatAmount } from '@utils/formatAmount'
import { format } from 'date-fns'
import { HStack, KeyboardAvoidingView, Modal, useToast } from 'native-base'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from './Button'
import { DateField } from './Date'
import { Input } from './Input'
import { RadioBox } from './RadioBox'
import { Select } from './Select'

type FormData = {
  description: string
  category: Category
  paymentType: PaymentType
  bank: Bank
  store: Store
  amount: string
  date: Date
  type: string
}

type NewExpenseModalProps = {
  isVisible: boolean
  onClose: () => void
}

export function NewExpenseModal({ isVisible, onClose }: NewExpenseModalProps) {

  const [categories, setCategories] = useState<Category[]>([])
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [banks, setBanks] = useState<Bank[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState: { errors }} = useForm<FormData>()
  const toast = useToast()

  async function loadCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error loading categories. Try again.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function loadPaymentTypes() {
    try {
      const { data } = await api.get('/paymentType')
      setPaymentTypes(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error loading payment types. Try again.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function loadBanks() {
    try {
      const { data } = await api.get('/banks')
      setBanks(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error loading banks. Try again.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function loadStores() {
    try {
      const { data } = await api.get('/stores')
      setStores(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error loading stores. Try again.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function handleSave(data: FormData) {

    try {
      setIsLoading(true)

      const payload = {
        description: data.description,
        category_id: data.category,
        date: format(data.date, 'yyyy-MM-dd'),
        amount: unformatAmount(data.amount),
        payment_type_id: data.paymentType,
        personal: data.type === 'personal',
        split: data.type === 'split',
        bank_id: data.bank,
        ...data.store && { store_id: data.store },
      }

      await api.post('/expenses', payload)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error creating expense. Try again.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
      onClose()
    }

  }

  useFocusEffect(useCallback(() => {
    async function loadFormParams(): Promise<void> {
      await Promise.all([
        loadCategories(),
        loadPaymentTypes(),
        loadBanks(),
        loadStores()
      ])
    }
    loadFormParams()
  }, []))

  return (
    <Modal isOpen={isVisible} onClose={onClose} closeOnOverlayClick={false}>
      <KeyboardAvoidingView behavior='padding'>
        <Modal.Content backgroundColor={'blue.600'} >
          <HStack display={'flex'} alignItems={'center'} justifyContent={'center'} bg="blue.600">
            <Modal.CloseButton mt={1}/>
            <Modal.Header
              bg="blue.600"
              borderBottomWidth={0}
              pb={0}
              _text={{ color: 'white.100', textAlign: 'center', fontSize: '2xl' }}
            >
              Create Expense
            </Modal.Header>
          </HStack>
          <Modal.Body bg={'blue.600'}>
            <Controller
              control={control}
              name="description"
              rules={{ required: 'Description is required' }}
              render={({ field: { onChange, value }}) => (
                <Input
                  placeholder='Expense description'
                  errorMessage={errors?.description?.message}
                  onChangeText={onChange}
                  icon={MaterialCommunityIcons}
                  iconName='format-title'
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: 'Category is required' }}
              render={({ field: { onChange, value }}) => (
                <Select
                  placeholder='Select category'
                  onChange={onChange}
                  errorMessage={errors?.category?.message}
                  options={categories}
                  value={value?.id}
                  icon={Entypo}
                  iconName='select-arrows'
                />
              )}
            />

            <Controller
              control={control}
              name="paymentType"
              rules={{ required: 'Payment type is required' }}
              render={({ field: { onChange, value }}) => (
                <Select
                  placeholder='Select payment Type'
                  onChange={onChange}
                  errorMessage={errors?.paymentType?.message}
                  options={paymentTypes}
                  value={value?.id}
                  icon={Entypo}
                  iconName='select-arrows'
                />
              )}
            />

            <Controller
              control={control}
              name="bank"
              rules={{ required: 'Bank is required' }}
              render={({ field: { onChange, value }}) => (
                <Select
                  placeholder='Select bank'
                  onChange={onChange}
                  errorMessage={errors?.bank?.message}
                  options={banks}
                  value={value?.id}
                  icon={Entypo}
                  iconName='select-arrows'
                />
              )}
            />

            <Controller
              control={control}
              name="store"
              render={({ field: { onChange, value }}) => (
                <Select
                  placeholder='Select store'
                  onChange={onChange}
                  options={stores}
                  value={value?.id}
                  icon={Entypo}
                  iconName='select-arrows'
                />
              )}
            />

            <Controller
              control={control}
              name="date"
              defaultValue={currentDate}
              render={({ field: { onChange, value }}) => (
                <DateField
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  onChangeDate={onChange}
                  icon={MaterialIcons}
                  iconName={'date-range'}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="amount"
              rules={{ required: 'Amount is required' }}
              render={({ field: { onChange, value }}) => (
                <Input
                  placeholder='99.99'
                  errorMessage={errors?.amount?.message}
                  onChangeText={text => onChange(formatCurrency(text))}
                  icon={Feather}
                  iconName='dollar-sign'
                  value={value?.toString()}
                  keyboardType='numeric'
                />
              )}
            />

            <Controller
              control={control}
              name='type'
              render={({ field: { onChange }}) => (
                <RadioBox
                  name='type'
                  onChange={onChange}
                  options={constants.expenseRadioBox}
                  icon={Fontisto}
                  iconName='checkbox-active'
                >
                </RadioBox>
              )}
            />

            <Button
              title='Save'
              onPress={handleSubmit(handleSave)}
              disabled={isLoading}
              isLoading={isLoading}
            />

          </Modal.Body>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>

  )
}
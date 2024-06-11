import { FilterValues, Filters } from '@dtos/DashboardDTO'
import { Entypo, MaterialIcons, } from '@expo/vector-icons'
import { api } from '@services/api'
import constants from '@utils/constants'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { FormControl, HStack, Modal } from 'native-base'
import { useState } from 'react'
import { Button } from './Button'
import { DateField } from './Date'
import { Select } from './Select'

type CurrentFilters = Omit<Filters, 'startDate' | 'endDate'> & {
  startDate: Date
  endDate: Date
}

type ExpensesFilterModalProps = {
  isVisible: boolean
  onClose: () => void
  onSubmit: (filters: Filters) => Promise<void>
  title: string
}

export function ExpensesFilterModal ({ isVisible, onClose, title, onSubmit }: ExpensesFilterModalProps) {
  const initialFilter = {
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
    filterBy: '',
  }

  const [filterValues, setFilterValues] = useState<FilterValues[]>([])
  const [currentFilters, setCurrentFilters] = useState<CurrentFilters>(initialFilter)
  const [maxStartDate, setMaxStartDate] = useState<Date>(new Date())
  const [minEndDate, setMinEndDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)

  const sortList = (data: FilterValues[], field: keyof FilterValues): FilterValues[] => data.sort(
    (a, b) => ((a[field]) > (b[field]) ? 1 : -1)
  )

  async function loadFilterValues (selectedFilter: string): Promise<FilterValues[]> {
    const { data } = await api.get(`/${selectedFilter}`)
    return data
  }

  async function handleSelectFilter(filterBy: string): Promise<void> {
    if(!filterBy) {
      setCurrentFilters({ ...currentFilters, filterBy: '', filterValue: '' })
      setFilterValues([])
      return
    }
    setCurrentFilters({ ...currentFilters, filterBy })
    const filterValues = await loadFilterValues(filterBy)
    const sortingKey = Object.keys(filterValues[0])[1] as keyof FilterValues
    setFilterValues(sortList(filterValues, sortingKey))
  }

  function handleSelectFilterValue(filterValue: string) {
    if(!filterValue) {
      setCurrentFilters({ ...currentFilters, filterBy: '', filterValue: '' })
      setFilterValues([])
      return
    }
    setCurrentFilters({ ...currentFilters, filterValue })
  }

  function handleOnClose() {
    setCurrentFilters(initialFilter)
    setFilterValues([])
    onClose()
  }

  function handleOnChangeDate(dateType: 'startDate' | 'endDate', date?: Date): void {
    if(!date) return

    if(dateType === 'startDate') {
      setMinEndDate(date)
    } else {
      setMaxStartDate(date)
    }

    setCurrentFilters({ ...currentFilters, [dateType]: date })
  }

  async function handleOnPress(): Promise<void> {
    const formattedFilters: Filters = {
      ...currentFilters.filterValue && {
        filterBy: currentFilters.filterBy,
        filterValue: currentFilters.filterValue
      },
      startDate: format(currentFilters.startDate, 'yyyy-MM-dd'),
      endDate: format(currentFilters.endDate, 'yyyy-MM-dd'),
    }
    setIsLoading(true)
    await onSubmit(formattedFilters)
    setIsLoading(false)
    handleOnClose()
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={handleOnClose}
      bottom={4}
    >
      <Modal.Content maxWidth='450px' maxH='550'>
        <HStack display={'flex'} alignItems={'center'} justifyContent={'center'} bg="blue.600">
          <Modal.CloseButton mt={1} />
          <Modal.Header
            bg="blue.600"
            borderBottomWidth={0}
            pb={0}
            _text={{ color: 'white.100', textAlign: 'center', fontSize: '2xl' }}
          >
            {title}
          </Modal.Header>
        </HStack>
        <Modal.Body bg={'blue.600'} _scrollview={{ scrollEnabled: false }} minH={300}>
          <FormControl isRequired>
            <Select
              onChange={item => handleSelectFilter(item)}
              options={constants.columnFilters}
              placeholder='Filter By'
              value={currentFilters.filterBy}
              icon={Entypo}
              iconName='select-arrows'
            />
            {!!currentFilters.filterBy && (
              <Select
                placeholder='Filter value'
                onChange={item => handleSelectFilterValue(item)}
                options={filterValues}
                value={currentFilters.filterValue}
                icon={Entypo}
                iconName='select-arrows'
              />
            )}
            <DateField
              currentDate={currentFilters.startDate}
              setCurrentDate={date => handleOnChangeDate('startDate', date)}
              value={currentFilters.startDate}
              onChangeDate={date => handleOnChangeDate('startDate', date as Date)}
              icon={MaterialIcons}
              iconName={'date-range'}
              maximumDate={maxStartDate}

            />
            <DateField
              currentDate={currentFilters.endDate}
              setCurrentDate={date => handleOnChangeDate('endDate', date)}
              value={currentFilters.endDate}
              onChangeDate={date => handleOnChangeDate('endDate', date as Date)}
              icon={MaterialIcons}
              iconName={'date-range'}
              minimumDate={minEndDate}
            />
            <Button
              title='Filter'
              disabled={isLoading}
              onPress={handleOnPress}
              isLoading={isLoading}
              isLoadingText='Filtering'
              h={12}
            />
            <FormControl.ErrorMessage>Please make a selection!</FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
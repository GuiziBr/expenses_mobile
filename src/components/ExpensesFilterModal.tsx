import { Filters } from '@contexts/ExpenseContext'
import { FilterValue } from '@dtos/DashboardDTO'
import DateTimePicker from '@react-native-community/datetimepicker'
import { api } from '@services/api'
import constants from '@utils/constants'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { FormControl, HStack, Modal, Select } from 'native-base'
import { useState } from 'react'
import { Button } from './Button'

type CurrentFilters = Omit<Filters, 'startDate' | 'endDate'> & {
  startDate: Date
  endDate: Date
}

type FilterModalProps = {
  isVisible: boolean
  onClose: () => void
  onSubmit: (filters: Filters) => Promise<void>
  title: string
}

type FilterValues = {
  id: string
  description: string
  name: string
}

export function ExpensesFilterModal ({ isVisible, onClose, title, onSubmit }: FilterModalProps) {
  const initialFilter = {
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
    filterBy: '',
  }

  const [filterValues, setFilterValues] = useState<FilterValues[]>([])
  const [currentFilters, setCurrentFilters] = useState<CurrentFilters>(initialFilter)
  const [maxStartDate, setMaxStartDate] = useState<Date>()
  const [minEndDate, setMinEndDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)

  const sortList = (data: FilterValue[], field: keyof FilterValue): FilterValues[] => data.sort(
    (a, b) => ((a[field]) > (b[field]) ? 1 : -1)
  )

  async function loadFilterValues (selectedFilter: string): Promise<FilterValue[]> {
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
    const sortingKey = Object.keys(filterValues[0])[1] as keyof FilterValue
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
      <Modal.Content maxWidth='450px' maxH='320'>
        <Modal.CloseButton/>
        <Modal.Header
          bg={'blue.600'}
          borderBottomWidth={0}
          _text={{ color: 'white.100', textAlign: 'center', fontSize: '2xl' }}
        >
          {title}
        </Modal.Header>
        <Modal.Body bg={'blue.600'} _scrollview={{ scrollEnabled: false }} minH={210}>
          <FormControl isRequired>
            <Select
              placeholder='Filter By'
              onValueChange={item => handleSelectFilter(item)}
              selectedValue={currentFilters.filterBy}
              h={12}
              placeholderTextColor={'white.100'}
              mb={4}
              color={'orange.700'}
            >
              {constants.columnFilters.map(filter => (
                <Select.Item
                  key={filter.id}
                  value={filter.id}
                  label={filter.description}
                />
              ))}
            </Select>
            {currentFilters.filterBy && (
              <Select
                placeholder='Filter value'
                h={12}
                placeholderTextColor={'white.100'}
                mb={4}
                selectedValue={currentFilters.filterValue}
                color={'orange.700'}
                onValueChange={item => handleSelectFilterValue(item)}
              >
                {filterValues.map(filter => (
                  <Select.Item
                    key={filter.id}
                    value={filter.id}
                    label={filter.description || filter.name}
                  />
                ))}
              </Select>
            )}
            <HStack mb={4}>
              <DateTimePicker
                value={currentFilters.startDate}
                onChange={(_, date) => handleOnChangeDate('startDate', date)}
                maximumDate={maxStartDate}
                accentColor='#FF9000'
              />
              <DateTimePicker
                value={currentFilters.endDate}
                onChange={(_, date) =>  handleOnChangeDate('endDate', date)}
                minimumDate={minEndDate}
                accentColor='#FF9000'
              />
            </HStack>
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
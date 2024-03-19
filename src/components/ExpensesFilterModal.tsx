import { Filters } from '@contexts/ExpenseContext'
import { FilterValue } from '@dtos/DashboardDTO'
import DateTimePicker from '@react-native-community/datetimepicker'
import { api } from '@services/api'
import constants from '@utils/constants'
import { endOfMonth, startOfMonth } from 'date-fns'
import { FormControl, Modal, Select } from 'native-base'
import { useState } from 'react'
import { Button } from './Button'

type CurrentFilters = Omit<Filters, 'startDate' | 'endDate'> & {
  startDate: Date
  endDate: Date
}

type FilterModalProps = {
  isVisible: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
}

export function ExpensesFilterModal ({ isVisible, onClose, title }: FilterModalProps) {
  const initialFilter = {
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
    filterBy: '',
  }

  const [filterValues, setFilterValues] = useState<string[]>([])
  const [currentFilters, setCurrentFilters] = useState<CurrentFilters>(initialFilter)
  const [maxStartDate, setMaxStartDate] = useState<Date>()
  const [minEndDate, setMinEndDate] = useState<Date>()

  const sortList = (
    data: FilterValue[],
    field: keyof FilterValue
  ): string[] => data
    .sort((a, b) => ((a[field] > b[field]) ? 1 : -1))
    .map(item => item[field])

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

  function handleOnClose() {
    setCurrentFilters(initialFilter)
    setFilterValues([])
    onClose()
  }

  function handleOnChangeDate(dateType: 'startDate' | 'endDate', date?: Date) {
    if(!date) return

    if(dateType === 'startDate') {
      setMinEndDate(date)
    } else {
      setMaxStartDate(date)
    }

    setCurrentFilters({ ...currentFilters, [dateType]: date })

  }

  return (
    <Modal isOpen={isVisible} onClose={handleOnClose} animationPreset="fade"  >
      <Modal.Content maxWidth="400px" bg={'blue.800'}>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <FormControl isRequired>
            <Select
              placeholder='Filter By'
              onValueChange={item => handleSelectFilter(item)}
              selectedValue={currentFilters.filterBy}
              h={12}

            >
              {constants.columnFilters.map(filter => (
                <Select.Item key={filter.id} value={filter.id} label={filter.description} />
              ))}
            </Select>
            {currentFilters.filterBy && (
              <Select placeholder='Filter value' h={12} mt={4}>
                {filterValues.map(filter => (
                  <Select.Item key={filter} value={filter} label={filter} />
                ))}
              </Select>
            )}
            <DateTimePicker
              value={currentFilters.startDate}
              onChange={(_, date) => handleOnChangeDate('startDate', date)}
              maximumDate={maxStartDate}
              accentColor='#FF9000'
              style={{ marginTop: 10, height: 50 }}
            />
            <DateTimePicker
              value={currentFilters.endDate}
              onChange={(_, date) => handleOnChangeDate('endDate', date)}
              minimumDate={minEndDate}
              accentColor='#FF9000'
              style={{ marginTop: 10, height: 50 }}
            />
            <Button title='Search' onPress={onClose} h={12}/>
            <FormControl.ErrorMessage>Please make a selection!</FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
import DateTimePicker, { DatePickerOptions } from '@react-native-community/datetimepicker'
import { FormControl, HStack, Icon } from 'native-base'

type DateProps = DatePickerOptions & {
  icon?: unknown
  iconName?: string
  currentDate: Date
  setCurrentDate: (date: Date) => void
  onChangeDate: (...event: unknown[]) => void
  customStyles?: {
    [key: string]: number | string;
  }
}

export function DateField({
  icon,
  iconName,
  currentDate,
  setCurrentDate,
  onChangeDate,
  customStyles,
  maximumDate,
  minimumDate
}: DateProps) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateDate = (value?: Date) => {
    if(!value) return
    setCurrentDate(value)
    onChangeDate(value)
  }

  return (
    <FormControl>
      <HStack
        bg={'blue.700'}
        px={4}
        mb={2}
        h={16}
        borderRadius={'sm'}
        alignItems={'center'}
        display={'flex'}
      >
        {icon &&
          <Icon
            as={icon}
            size={'md'}
            name={iconName}
          />
        }
        <DateTimePicker
          mode='date'
          value={currentDate}
          onChange={(_, date) => updateDate(date)}
          accentColor='#FF9000'
          themeVariant='dark'
          textColor='#FF9000'
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          style={customStyles}
        />
      </HStack>
    </FormControl>

  )
}
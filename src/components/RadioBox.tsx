
import { FormControl, HStack, IRadioGroupProps, Icon, Radio, Text } from 'native-base'

type RadioBoxProps = IRadioGroupProps & {
  icon?: unknown
  iconName?: string
  options: {
    value: string
    label: string
  }[],
  onChange: ((value: string) => void)
}
export function RadioBox({ icon, iconName, options, onChange }: RadioBoxProps) {
  return (
    <FormControl>
      <HStack
        bg={'blue.700'}
        h={16}
        px={4}
        mb={3}
        borderRadius={'sm'}
        alignItems={'center'}
        display={'flex'}
      >
        {icon && (
          <Icon
            as={icon}
            size={'md'}
            name={iconName}
          />
        )}

        <Radio.Group
          name="type"
          flexDirection="row"
          onChange={onChange}
          display={'flex'}
          ml={4}

        >
          {options.map(option => (
            <Radio
              key={option.value}
              value={option.value}
              colorScheme={'primary'}
              size={'md'}
            >
              <Text color={'gray.500'} mr={4}>{option.label}</Text>
            </Radio>
          ))}

        </Radio.Group>
      </HStack>
    </FormControl>
  )
}
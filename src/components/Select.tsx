
import { FormControl, HStack, ISelectProps, Icon, Select as NativeBaseSelect } from 'native-base'

type SelectProps = ISelectProps & {
  icon?: unknown
  iconName?: string
  errorMessage?: string | null
  onChange: (value: string) => void
  options: {
    id: string;
    [key: string]: string

  }[]
  placeholder: string
  value?: string
}

export function Select({ errorMessage, icon, onChange, options, placeholder, value, iconName, ...rest  }: SelectProps) {
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
        {...!!errorMessage && { borderColor: 'red.700', borderWidth: 1 }}
        {...rest}
      >

        {icon &&
          <Icon
            as={icon}
            size={'md'}
            name={iconName}
          />
        }

        <NativeBaseSelect
          placeholder={placeholder}
          onValueChange={onChange}
          selectedValue={value}
          h={16}
          w={64}
          borderColor={'transparent'}
          placeholderTextColor={'gray.500'}
          color={'orange.700'}
          fontSize={'md'}
        >
          <NativeBaseSelect.Item label={placeholder} value={''} />
          {options.map(key => (
            <NativeBaseSelect.Item
              key={key.id}
              label={key.description || key.name}
              value={key.id}
            />
          ))}
        </NativeBaseSelect>
      </HStack>

    </FormControl>
  )
}
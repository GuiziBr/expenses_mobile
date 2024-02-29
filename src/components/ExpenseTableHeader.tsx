import { AntDesign } from '@expo/vector-icons'
import { FlatList, Icon, Pressable, Text } from 'native-base'

type ExpenseTableHeaderProps = {
  content: Array<string>
  onPress: (item: string) => void
}

export function ExpenseTableHeader({ content, onPress }: ExpenseTableHeaderProps) {
  return (
    <FlatList
      data={content}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPress(item)}
          overflow="hidden"
          flexDirection="row"
          alignItems="center"
        >
          <Text
            color="gray.300"
            fontSize="md"
            textTransform="uppercase"
          >
            {item}
          </Text>
          <Icon
            as={AntDesign}
            name='caretdown'
            size="2"
            ml={.5}
          />
        </Pressable>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{ justifyContent: 'space-between', w: '100%' }}
      maxH={8}
      mx={1}
    />
  )
}
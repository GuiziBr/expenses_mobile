import { AntDesign } from '@expo/vector-icons'
import { FlatList, Icon, Pressable, Text } from 'native-base'

type ExpenseTableHeaderProps = {
  content: {
    id: string
    description: string
  }[]
  onColumnPress: (item: string) => void
}

export function ExpenseTableHeader({ content, onColumnPress }: ExpenseTableHeaderProps) {
  return (
    <FlatList
      data={content}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onColumnPress(item.id)}
          overflow="hidden"
          flexDirection="row"
          alignItems="center"
          minW="33%"
          pl={2}
        >
          <Text
            color="gray.300"
            fontSize="md"
            textTransform="uppercase"
          >
            {item.description}
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
      _contentContainerStyle={{
        mx: 1,
        w: '100%',
      }}
      maxH={8}
      scrollEnabled={false}
    />
  )
}
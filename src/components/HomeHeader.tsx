import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import { UserAvatar } from './UserAvatar'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack bg="blue.500" pt={16} pb={16} px={5} alignItems='center'>
      <UserAvatar
        source={{ uri: 'https://github.com/GuiziBr.png' }}
        alt='Users avatar'
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="white.100" fontSize="md">Hello</Text>
        <Heading color="white.100" fontSize="md">Ricardo</Heading>
      </VStack>
      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name='logout'
          color="white.100"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}
import { Entypo, MaterialIcons, Octicons } from '@expo/vector-icons'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BalanceDashboard } from '@screens/BalanceDashboard'
import { PersonalDashboard } from '@screens/PersonalDashboard'
import { SharedDashboard } from '@screens/SharedDashboard'
import { useTheme } from 'native-base'

type AppRoutes = {
  personalDashboard: undefined
  sharedDashboard: undefined
  balance: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { colors } = useTheme()

  const ICON_SIZE = 28

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.orange['700'],
      tabBarStyle: {
        backgroundColor: colors.blue['700'],
        borderTopWidth: 0,
        height: 80,
        paddingBottom: 20,
        paddingTop: 10
      }
    }}>
      <Screen
        name='personalDashboard'
        component={PersonalDashboard}
        options={{
          tabBarLabel: 'Personal',
          tabBarIcon: ({ color }) =>
            <Octicons name='person-fill' size={ICON_SIZE} color={color}/>
        }}
      />
      <Screen
        name='sharedDashboard'
        component={SharedDashboard}
        options={{
          tabBarLabel: 'Shared',
          tabBarIcon: ({ color }) =>
            <Entypo name='slideshare' size={ICON_SIZE} color={color}/>
        }}

      />
      <Screen
        name='balance'
        component={BalanceDashboard}
        options={{
          tabBarLabel: 'Balance',
          tabBarIcon: ({ color }) =>
            <MaterialIcons name='account-balance' size={ICON_SIZE} color={color}/>
        }}
      />
    </Navigator>
  )
}
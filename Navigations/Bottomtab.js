import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashBoard from '../Components/DashBoard';
import Mybooking from '../Components/Mybooking';
import Hotels from '../Components/Hotels';



const Tab = createBottomTabNavigator();

function Bottomtab() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarLabel: 'DashBoard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Mybooking"
        component={Mybooking}
        options={{
          tabBarLabel: 'Mybooking',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={Hotels}
        options={{
          tabBarLabel: 'Hotels',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Bottomtab
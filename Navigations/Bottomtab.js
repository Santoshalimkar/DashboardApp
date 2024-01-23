import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashBoard from '../Components/DashBoard';
import Mybooking from '../Components/Mybooking';
import Hotels from '../Components/Hotels';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSquarePollVertical} from '@fortawesome/free-solid-svg-icons/faSquarePollVertical';
import {faHotel} from '@fortawesome/free-solid-svg-icons/faHotel';
import {faCheckToSlot} from '@fortawesome/free-solid-svg-icons/faCheckToSlot';

const Tab = createBottomTabNavigator();

function Bottomtab() {
  return (
    <Tab.Navigator
      initialRouteName="DashBoard"
      screenOptions={{
        tabBarActiveTintColor: '#60a5fa',
      }}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          headerShown:false,
          tabBarStyle:{height:60,borderTopLeftRadius:20,borderTopRightRadius:20,position:'absolute',backgroundColor:'#eff6ff'},
          tabBarLabel: 'DashBoard',
          tabBarLabelStyle:{padding:2 , fontSize:12},
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon
              color={color}
              size={size}
              icon={faSquarePollVertical}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mybooking"
        component={Mybooking}
        options={{
          headerShown:false,
          tabBarStyle:{height:60,borderTopLeftRadius:20,borderTopRightRadius:20,position:'absolute',backgroundColor:'#eff6ff'},
          tabBarLabelStyle:{padding:2 , fontSize:12},
          tabBarLabel: 'Mybooking',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon color={color} size={size} icon={faCheckToSlot} />

          ),
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={Hotels}
        options={{
          headerShown:false,
          tabBarStyle:{height:60,borderTopLeftRadius:20,borderTopRightRadius:20,position:'absolute',backgroundColor:'#eff6ff'},
          tabBarLabelStyle:{padding:2 , fontSize:12},
          tabBarLabel: 'Hotels',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon color={color} size={size} icon={faHotel} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Bottomtab;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import bottomtab from './Navigations/Bottomtab';
import { Text, TouchableOpacity } from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import DashBoard from './Components/DashBoard';
import Mybooking from './Components/Mybooking';
import Hotels from './Components/Hotels';
import { View } from 'react-native-reanimated/lib/typescript/Animated';


const Stack = createNativeStackNavigator();


export default function App() {


  const opendrawer=()=>{
    navigation.openDrawer();
  }

  return (
    
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Home" component={bottomtab} 
          options={{headerShown:true,
          headerRight:()=>
          <TouchableOpacity >
          <FontAwesomeIcon size={22}  icon={faBars} />
          </TouchableOpacity>
          }}
        />
      </Stack.Navigator>
      {/* <Drawer.Navigator>
      <Drawer.Screen name="DashBoard" component={DashBoard} />
      <Drawer.Screen name="Mybooking" component={Mybooking} />
      <Drawer.Screen name="Hotels" component={Hotels} />
    </Drawer.Navigator> */}

    </NavigationContainer>
   
  );
}
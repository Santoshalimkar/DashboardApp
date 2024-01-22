import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import bottomtab from './Navigations/Bottomtab';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Home" component={bottomtab} 
          options={{headerShown:false}}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
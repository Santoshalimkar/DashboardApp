import  React,{useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import bottomtab from './Navigations/Bottomtab';
import {Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faArrowsToDot} from '@fortawesome/free-solid-svg-icons/faArrowsToDot';
import Login from './Onboarding/Login';
import Signup from './Onboarding/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoggedIn, setLoggedIn] =useState(false);

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking user authentication:', error);
    }
  };
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isLoggedIn ? (

        <Stack.Screen
          name="Home"
          component={bottomtab}
          options={{
            headerShown: true,
            headerTitle: 'ActiveLife',
            headerTitleStyle:{color:'#60a5fa'},
            headerRight: () => (
              <TouchableOpacity>
                <FontAwesomeIcon size={22} icon={faBars} />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity className='mr-4'>
                <FontAwesomeIcon size={22} color='#60a5fa' icon={faArrowsToDot} />
              </TouchableOpacity>
            ),
          }}
        />
      )
      :
      (
        <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
          </>

      )}
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}

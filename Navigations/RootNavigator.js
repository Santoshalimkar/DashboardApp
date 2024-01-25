import  React,{useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faArrowsToDot} from '@fortawesome/free-solid-svg-icons/faArrowsToDot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bottomtab from './Bottomtab';
import HotelDetails from '../Components/HotelDetails';
import Addroom from '../Components/Addroom';
import Login from '../Onboarding/Login';
import Signup from '../Onboarding/Signup';


const Stack = createNativeStackNavigator();




export default function RootNavigator() {

  const [isLoggedIn, setLoggedIn] =useState(false);

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const isLog = await AsyncStorage.getItem('isLogged');
      if (userToken) {
        setLoggedIn(isLog);
      }
    } catch (error) {
      console.error('Error checking user authentication:', error);
    }
  };
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isLoggedIn ? (
        <>

        <Stack.Screen
          name="Home"
          component={Bottomtab}
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
         <Stack.Screen
              name="Hoteldetails"
              component={HotelDetails}
              options={{ headerShown: false }}
            />
         <Stack.Screen
              name="Addroom"
              component={Addroom}
              options={{ headerShown: false }}
            />
             {/* <Stack.Screen
          name="Home2"
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
        /> */}
      </>)
      :
      (
        <>
            <Stack.Screen
            initialRouteName="Login"
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

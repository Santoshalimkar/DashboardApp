import  React,{useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons/faPowerOff';
import {faArrowsToDot} from '@fortawesome/free-solid-svg-icons/faArrowsToDot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bottomtab from './Bottomtab';
import HotelDetails from '../Components/HotelDetails';
import Addroom from '../Components/Addroom';
import Login from '../Onboarding/Login';
import Signup from '../Onboarding/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../Redux/Authslice';
import SplashScreen from '../Components/SplashScreen';


const Stack = createNativeStackNavigator();




export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          dispatch(logout());
          return;
        }
       


        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (userToken) {
          dispatch(login());
        }

      } catch (error) {
        console.error('Error during app initialization:', error);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
			setTimeout(async () => {
				setLoading(false);
			}, 3000);
	

	}, []);

  if (loading) {
    return <SplashScreen />;
  }
 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(logout());
    } catch (error) {
      console.error('Error removing token from AsyncStorage:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isLogged ? (
        <>

        <Stack.Screen
          name="Home"
          component={Bottomtab}
          options={{
            headerShown: true,
            headerTitle: 'ActiveLife',
            headerTitleStyle:{color:'#60a5fa'},
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout}>
                <FontAwesomeIcon size={22} icon={faPowerOff} />
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

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../Redux/Authslice';


const Login = ({navigation} ) => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 6;
  const handleLogin = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (password.length < passwordMinLength) {
      Alert.alert(
        'Validation Error',
        `Password must be at least ${passwordMinLength} characters long.`,
      );
      return;
    }
    try {
      const response = await axios.post('https://api-uat.activetlife.com/api/hotel-management/property-owner/signin-password', {
        email: email,
        password: password,
      });

      console.log(response)
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('isLogged', 'true');
        dispatch(login())
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid email or password. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View
        style={{elevation: 2}}
        className="bg-white h-[60vh] w-11/12 rounded-lg ">
        <Text className="text-blue-400 font-bold text-center p-2 text-lg mb-8">
          Login
        </Text>
        <View className="w-full items-start flex p-4  gap-6">
          <TextInput
            className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
            placeholderTextColor={'black'}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="border border-gray-200  w-full text-gray-800 rounded-md pl-3 bg-gray-50"
            placeholderTextColor={'black'}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={handleLogin} className="bg-blue-400 w-4/5 mx-auto rounded-lg p-2 h-10 mt-4">
          <Text className="text-center text-white font-bold">Login</Text>
        </TouchableOpacity>

        <View className="flex flex-row mt-4 p-2 justify-center  ">
          <Text className="text-gray-800 text-center">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-blue-400 text-center">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

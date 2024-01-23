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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const [mobilenumber, setmobilenumber] = useState('');

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
      const response = await axios.post('your_login_api_endpoint', {
        email: email,
        password: password,
      });

      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        console.log('Login successful! Redirecting to the main app screen.');
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
        className="bg-blue-50 h-auto w-11/12 rounded-lg ">
        <Text className="text-blue-400 font-bold text-center p-2 text-lg mb-4">
          Register
        </Text>
        <View className="w-full items-start flex p-4  gap-6">
          <TextInput
            className="border border-blue-200 w-full text-gray-800 rounded-md pl-3"
            placeholderTextColor={'#60a5fa'}
            placeholder="Username"
            value={Username}
            onChangeText={text => setUsername(text)}
      
          />
          <TextInput
            className="border border-blue-200 w-full text-gray-800 rounded-md pl-3"
            placeholderTextColor={'#60a5fa'}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="border border-blue-200 w-full text-gray-800 rounded-md pl-3"
            placeholderTextColor={'#60a5fa'}
            placeholder="Mobile Number"
            value={mobilenumber}
            onChangeText={text => setmobilenumber(text)}
            keyboardType="number-pad"
          />
          <TextInput
            className="border border-blue-200  w-full text-gray-800 rounded-md pl-3"
            placeholderTextColor={'#60a5fa'}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity className="bg-blue-400 w-4/5 mx-auto rounded-lg p-2 h-10 mt-4">
          <Text className="text-center text-white font-bold">Register</Text>
        </TouchableOpacity>

        <View className="flex flex-row mt-4 p-2 justify-center mb-4 ">
          <Text className="text-gray-800 text-center">
            Already have an account?
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-400 text-center">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

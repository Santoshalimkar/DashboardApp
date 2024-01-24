import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const [mobilenumber, setmobilenumber] = useState('');
  const [Loading, setLoading] = useState(false);

  

  const handleFormSubmit = async () => {
    setLoading(true);

    try {
      const requestData = {
        mobileNumber: mobilenumber,
        email: email,
        fullName:Username,
        password: password,
        documents: [
          {
            URL: 'url',
            format: 'application/pdf',
            description: 'Pan Card',
          },
        ],
      };

      const response = await axios.post(
        'https://api-uat.activetlife.com/api/hotel-management/property-owner',
        requestData
      );
     
      if(response){
        navigation.navigate('Login');

      }else{
        Alert.alert(response.data.message)
      }

    } catch (error) {
      console.error('Registration failed:', error.message);
      Alert.alert('Registration failed')
    } finally {
      setLoading(false);
    }
  };


  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View
        style={{elevation: 2}}
        className="bg-white h-auto w-11/12 rounded-lg ">
        <Text className="text-blue-400 font-bold text-center p-2 text-lg mb-4">
          Register
        </Text>
        <View className="w-full items-start flex p-4  gap-6">
          <TextInput
            className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
            placeholderTextColor={'black'}
            placeholder="Username"
            value={Username}
            onChangeText={text => setUsername(text)}
      
          />
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
            className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
            placeholderTextColor={'black'}
            placeholder="Mobile Number"
            value={mobilenumber}
            onChangeText={text => setmobilenumber(text)}
            keyboardType="number-pad"
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
        <TouchableOpacity onPress={handleFormSubmit} className="bg-blue-400 w-4/5 mx-auto rounded-lg p-2 h-10 mt-4">
        {Loading?<ActivityIndicator color={'white'} size="large"/>:
          <Text className="text-center text-white font-bold">Register</Text>}
        </TouchableOpacity>

        <View className="flex flex-row mt-4 p-2 justify-center mb-4 ">
          <Text className="text-gray-800 text-center">
            Already have an account?
          </Text>
          <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-400 text-center">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

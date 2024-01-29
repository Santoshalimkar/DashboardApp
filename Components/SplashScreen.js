// SplashScreen.js
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowsToDot} from '@fortawesome/free-solid-svg-icons/faArrowsToDot';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <FontAwesomeIcon size={40} color="#60a5fa" icon={faArrowsToDot} />

      <Text className="text-blue-400 font-bold text-lg mt-2 ">ActiveLife</Text>

      <View className='mt-4'>
        <ActivityIndicator color={'#60a5fa'} size={'large'}/>
      </View>
    </View>
  );
};

export default SplashScreen;

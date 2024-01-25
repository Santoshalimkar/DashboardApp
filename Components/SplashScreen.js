// SplashScreen.js
import React from 'react';
import {View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowsToDot} from '@fortawesome/free-solid-svg-icons/faArrowsToDot';


const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white'}}>
      <FontAwesomeIcon size={30} color="#60a5fa" icon={faArrowsToDot} />

      <Text className='text-blue-400 font-bold text-lg '>ActiveLife</Text>
    </View>
  );
};

export default SplashScreen;

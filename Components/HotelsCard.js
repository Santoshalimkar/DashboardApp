import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { useNavigation } from '@react-navigation/native';


const HotelsCard = ({data}) => {
  const navigation=useNavigation()

  const navigatecard=(id)=>{
    navigation.navigate('Hoteldetails',{id:id})   
  }
  return (
    <TouchableOpacity onPress={()=>navigatecard(data.item._id)}>

    <View
      style={{elevation: 0}}
      className="bg-white w-11/12 mx-auto h-auto my-2 rounded-md border border-gray-200">
      <View style={{elevation: 0}} className="bg-blue-50 rounded-md">
        <Image
          className="w-full h-52 rounded-t-md"
          source={{
            uri:data.item.images[0].URL
          }}
        />
        <View className="flex flex-row justify-between items-center mx-2">
          <View className='p-2'>
            <Text className='text-lg capitalize text-blue-400'>{data.item.name}</Text>
          </View>
          <View>
            <FontAwesomeIcon size={22} color="#d1d5db" icon={faArrowRight} />
          </View>
        </View>
        <View>
            <Text style={{fontFamily:"Poppins-Regular"}} className="text-gray-700 text-xs p-4">
            {data.item.description}
            </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default HotelsCard;

const styles = StyleSheet.create({
  gradient: {},
});

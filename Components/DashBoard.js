import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserGroup} from '@fortawesome/free-solid-svg-icons/faUserGroup';
import {faArrowRightLong} from '@fortawesome/free-solid-svg-icons/faArrowRightLong';
import {faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons/faIndianRupeeSign';
import {faHotel} from '@fortawesome/free-solid-svg-icons/faHotel';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons/faCartShopping';

const DashBoard = () => {
  return (
    <View className='bg-white flex-1'>
    <StatusBar backgroundColor={'white'} translucent={true}/>
      <View className='justify-center mx-2 p-2'>
         <View style={{elevation:2}} className='mt-2 w-full h-24 bg-white rounded-md flex justify-between items-center flex-row p-4'>
          <View className='flex flex-row items-center justify-between gap-4'>
            <View><FontAwesomeIcon color='#60a5fa' size={30} icon={faUserGroup} /></View>
            <View className='flex flex-col  justify-between '>
              <Text className='text-gray-400 text-xs'>New User</Text>
              <Text className='text-indigo-500'>3028</Text>
            </View>
          </View>
          <View><FontAwesomeIcon size={20} color='grey'  icon={faArrowRightLong} /></View>
         </View>
         <View style={{elevation:2}} className='mt-2 w-full h-24 bg-white rounded-md flex justify-between items-center flex-row p-4'>
          <View className='flex flex-row items-center justify-between gap-4'>
            <View><FontAwesomeIcon color='#60a5fa' size={30} icon={faIndianRupeeSign} /></View>
            <View className='flex flex-col  justify-between '>
              <Text className='text-gray-400 text-xs'>Total Booking</Text>
              <Text className='text-indigo-500'>38</Text>
            </View>
          </View>
          <View><FontAwesomeIcon size={20} color='grey'  icon={faArrowRightLong} /></View>
         </View>
         <View style={{elevation:2}} className='mt-2 w-full h-24 bg-white rounded-md flex justify-between items-center flex-row p-4'>
          <View className='flex flex-row items-center justify-between gap-4'>
            <View><FontAwesomeIcon color='#60a5fa' size={30} icon={faHotel} /></View>
            <View className='flex flex-col justify-between '>
              <Text className='text-gray-400 text-xs'>Total Hotel</Text>
              <Text className='text-indigo-500'>8</Text>
            </View>
          </View>
          <View><FontAwesomeIcon size={20} color='grey'  icon={faArrowRightLong} /></View>
         </View>
         <View style={{elevation:2}} className='mt-2 w-full h-24 bg-white rounded-md flex justify-between items-center flex-row p-4'>
          <View className='flex flex-row items-center justify-between gap-4'>
            <View><FontAwesomeIcon color='#60a5fa' size={30} icon={faCartShopping} /></View>
            <View className='flex flex-col  justify-between '>
              <Text className='text-gray-400 text-xs'>Upcoming Booking</Text>
              <Text className='text-indigo-500'>28</Text>
            </View>
          </View>
          <View><FontAwesomeIcon size={20} color='grey'  icon={faArrowRightLong} /></View>
         </View>
    
      </View>

      <Text className='text-gray-800 font-bold mx-2 p-2'>Recent Booking</Text>

    </View>
  )
}

export default DashBoard
import { View, Text } from 'react-native'
import React from 'react'
import HotelsCard from './HotelsCard'



const Hotels = () => {
  return (
    <View className='bg-white flex-1'>
        <Text className='text-gray-800 mx-2 p-2 font-bold'>My Hotels</Text>
        <HotelsCard/>
      </View>
  )
}

export default Hotels
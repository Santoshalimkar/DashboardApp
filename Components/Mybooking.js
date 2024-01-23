import { Text, View } from 'react-native'
import React, { Component } from 'react'
import BookingCard from './BookingCard'

export class Mybooking extends Component {
  render() {
    return (
      <View className='bg-white flex-1'>
        <Text className='text-gray-800 mx-2 p-2 font-bold'>My Booking</Text>
        <BookingCard/>
      </View>
    )
  }
}

export default Mybooking
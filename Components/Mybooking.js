import { Text, View,FlatList } from 'react-native'
import React, { Component, useState ,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BookingCard from './BookingCard'

 const  Mybooking =()=> {
  const [bookinglist,Setbooking]=useState([])


  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken'); 

      const response = await axios.get(
        'https://api-uat.activetlife.com/api/hotel-management/property-owner/bookings?page=1&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const products = response.data.items.bookings;

      if (products) {
        Setbooking(products);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    return (
      <View className='bg-white flex-1 pb-[60px]'>
        <Text className='text-gray-800 mx-2 p-2 font-bold'>My Booking</Text>
        <FlatList
        data={bookinglist}
        keyExtractor={(item) => item._id}
        renderItem={(item)=>(
          <BookingCard data={item}/>
        )}
      />
       
      </View>
    )
 
}

export default Mybooking
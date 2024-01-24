import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment';
import {faShareNodes} from '@fortawesome/free-solid-svg-icons/faShareNodes';


const BookingCard = ({data}) => {
  console.log(data?.item)

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };
  return (
    <View
      style={{elevation: 2}}
      className="bg-white w-11/12 mx-auto h-auto my-2 rounded-md flex flex-col ">
        <Image
          className="w-[100%] h-20 rounded-t-md"
          source={{
            uri:data?.item?.hotel?.images[0].URL
          }}
        />
      <View style={{elevation: 2}} className="bg-blue-50 rounded-r-md w-[100%] flex flex-row-reverse p-2  justify-between ">
        <View className="flex mt-2  mx-2 w-[25%]">
          <View>
            <TouchableOpacity className='bg-blue-400 w-20 h-8 rounded-md'>
              <Text className='text-white text-xs pt-2 font-bold text-center'> ₹{data?.item?.room?.price?.amountPerDay}/day</Text>
            </TouchableOpacity>
            <TouchableOpacity className=' w-20 h-8 rounded-md mt-2'>
              <Text className=' text-xs pt-2 font-bold text-center text-gray-800'> ₹{data?.item?.room?.price?.discount}/disc</Text>
            </TouchableOpacity>
            <TouchableOpacity className=' w-20 h-8 rounded-md '>
              <Text className=' text-xs pt-2 font-bold text-center text-gray-800'> ₹{data?.item?.room?.price?.extraChargePerGuests}/charge</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='w-[70%] pt-1'>
            <Text style={{fontFamily:"Poppins-Regular"}} className="text-gray-700 text-xs ">
           Hotel : {data?.item?.hotel?.name}
            </Text>
            <Text style={{fontFamily:"Poppins-Regular"}} className="text-gray-700 text-xs ">
           {data?.item?.user?.fullName}
            </Text>
            <Text style={{fontFamily:"Poppins-Regular"}} className="text-gray-700 text-xs ">
           {data?.item?.user?.mobileNumber}
            </Text>
            <Text style={{fontFamily:"Poppins-Regular"}} className="text-gray-700 text-xs ">
           {data?.item?.user?.email}
            </Text>
            <Text style={{fontFamily:"Poppins-Regular"}} className="text-gray-700 text-xs ">
           {formatDate(data?.item?.checkIn)} To {formatDate(data?.item?.checkOut)}
            </Text>
            <Text style={{fontFamily:"Poppins-Regular"}} className="w-24 text-xs mt-2 p-1 bg-green-500 text-center rounded-md text-white">
           Status : {data?.item?.status}
            </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  gradient: {},
});

import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HotelsCard from './HotelsCard';
import { useFocusEffect } from '@react-navigation/native';

const Hotels = () => {
  const [productList, setProductList] = useState([]);
  const [modalvisible, setmodalvisible] = useState(false);
  const [hotelData, setHotelData] = useState({
    name: '',
    location: {
      type: 'Point',
      coordinates: [17.6868, 83.2185],
    },
    address: '',
    images: [
      {
        URL: 'https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-01.jpg',
        thumbnail: false,
        format: 'image/jpg',
        description: '',
      },
      {
        URL: 'https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-02.jpg',
        thumbnail: true,
        format: 'image/jpg',
        description: '',
      },
      {
        URL: 'https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-03.jpg',
        thumbnail: false,
        format: 'image/jpg',
        description: '',
      },
      {
        URL: 'https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-04.jpg',
        thumbnail: false,
        format: 'image/jpg',
        description: '',
      },
    ],
    description: '',
    minimumPrice: 0,
    details: [
      {
        URL: 'url image 41',
        label: 'City view',
      },
      {
        URL: 'url image 41',
        label: 'Garden',
      },
      {
        URL: 'url image 41',
        label: 'Outdoor swimming pool',
      },
      {
        URL: 'url image 41',
        label: 'BBQ facilities',
      },
      {
        URL: 'url image 42',
        label: 'Fitness Center',
      },
    ],
  });

  // add hotel

  const handleChange = (field, value) => {
    setHotelData({...hotelData, [field]: value});
  };

  const Handlesubmithotel = async () => {
    const accessToken = await AsyncStorage.getItem('userToken');

    if (!accessToken) {
      console.error('Access token not found in local storage');
      return;
    }

    const url = 'https://api-uat.activetlife.com/api/hotel-management/hotel';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(hotelData),
      });

      if (response.ok) {
        fetchData();
        console.log('Hotel data successfully sent to the server');
      } else {
        console.error(
          'Error sending hotel data to the server:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error sending hotel data:', error.message);
    }

    setmodalvisible(false);
  };

  // fetch hotel

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken');

      const response = await axios.get(
        'https://api-uat.activetlife.com/api/hotel-management/property-owner/hotels?page=1&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const products = response.data;

      setProductList(products?.items?.hotels);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <>
    
      <View className="bg-white flex-1 pb-20">
        <StatusBar backgroundColor={'black'} animated />
        <View className="flex flex-row items-center justify-between mx-2">
          <Text className="text-gray-800 mx-2 p-4 text-lg ml-2 font-bold">
            My Hotels
          </Text>
          <TouchableOpacity
            onPress={() => setmodalvisible(true)}
            className="bg-blue-400 mr-2 p-2 rounded-md">
            <Text className="text-white">Add Hotel</Text>
          </TouchableOpacity>
        </View>
        {productList.length === 0 ? (
          <View className='flex-1 justify-center items-center '>

<Text className='text-black text-lg'>No hotels Added</Text>
</View>
        ) : (
          <FlatList
            data={productList}
            keyExtractor={(item) => item._id}
            renderItem={(item) => <HotelsCard data={item} />}
          />
        )}
      </View>

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalvisible}
        onRequestClose={() => {
          setmodalvisible(!modalvisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          className="absolute h-screen  flex-1  justify-center items-center  w-full  ">
          <View className="absolute top-24 flex  h-[60vh]  rounded-md w-full p-2 bg-white ">
            <Text
              style={{fontFamily: 'Poppins-Regular'}}
              className="text-gray-800 p-2 font-bold mt-4">Add Hotel</Text>
            <View className="w-full flex gap-4 mt-2">
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="name"
                value={hotelData.name}
                onChangeText={text => handleChange('name', text)}
                autoCapitalize="none"
              />
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="address"
                value={hotelData.address}
                onChangeText={text => handleChange("address", text)}
                autoCapitalize="none"
              />
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="description"
                value={hotelData.description}
                onChangeText={text => handleChange("description", text)}
                autoCapitalize="none"
              />
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="minimumPrice"
                value={hotelData.minimumPrice}
                onChangeText={text => handleChange("minimumPrice", text)}
                keyboardType='numeric'
                autoCapitalize="none"
              />
            </View>

            <View className="flex flex-row items-center gap-2 ml-auto p-2 mt-2">
              <TouchableOpacity
                onPress={() => {
                  setmodalvisible(!modalvisible);
                }}
                className="bg-red-400 rounded-md h-8 w-20 p-1">
                <Text className="text-white text-center ">Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={Handlesubmithotel}
                className="bg-blue-400 rounded-md h-8 w-20 p-1">
                <Text className="text-white text-center">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Hotels;

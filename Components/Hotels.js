import { View, Text,FlatList, StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HotelsCard from './HotelsCard'



const Hotels = () => {

  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken'); 

      const response = await axios.get(
        'https://api-uat.activetlife.com/api/hotel-management/property-owner/hotels?page=1&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const products = response.data;

      setProductList(products?.items?.hotels);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <View className='bg-white flex-1 pb-20'>
      <StatusBar  animated/>
        <Text className='text-gray-800 mx-2 p-4 text-lg ml-2 font-bold'>My Hotels</Text>
        <FlatList
        data={productList}
        keyExtractor={(item) => item._id}
        renderItem={(item)=>(
          <HotelsCard data={item}/>
        )}
      />
      </View>
  )
}

export default Hotels
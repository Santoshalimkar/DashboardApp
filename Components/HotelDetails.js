import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

const HotelDetails = ({route}) => {
  const {id} = route.params;
  const [Hotel, setHotel] = useState([]);
  const [RoomList, setRoomList] = useState([]);

  const fetchHotelById = async hotelId => {
    try {
      const hotelResponse = await axios.get(
        `https://api-uat.activetlife.com/api/hotel-management/hotel/${hotelId}`,
      );

      const hotelToUpdate = hotelResponse.data.hotel;

      if (hotelToUpdate) {
        setHotel(hotelToUpdate);
      } else {
        console.error('Hotel not found with id:', hotelId);
      }
    } catch (error) {
      console.error('Error fetching hotel details:', error.message);
    }
  };

  useEffect(() => {
    fetchHotelById(id);
  }, [id]);



  const fetchroomData = async (getid) => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken'); 

      const response = await axios.get(
        `https://api-uat.activetlife.com/api/hotel-management/property-owner/${getid}/rooms?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const products = response.data;

      setRoomList(products?.items?.rooms);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchroomData(id);
  }, [id]);

console.log(RoomList)

  return (
    <View className="">
      <StatusBar backgroundColor={'transparent'} />
      <View className="w-full">
        {Hotel.images && Hotel.images.length > 0 ? (
          <Image
            resizeMode="cover"
            className="h-60 w-full"
            source={{uri: Hotel.images[0].URL}}
          />
        ) : (
          <Text>No images available</Text>
        )}
        <View className="absolute  top-12 ml-4">
          <TouchableOpacity>
            <FontAwesomeIcon color="white" size={25} icon={faArrowLeft} />
          </TouchableOpacity>
        </View>

        <ScrollView className=" h-[500px]">
          <View className="p-2 mx-2 border-gray-300  border-b ">
            <Text className="text-black font-bold text-lg">{Hotel.name}</Text>
            <Text className="text-black font-medium text-xs pb-3">
              {Hotel.address}
            </Text>
          </View>

          <View className="p-2 mx-2 border-gray-300  border-b">
            <View>
              <Text className="text-black font-bold text-md">Photos</Text>
            </View>
            <FlatList
              data={Hotel.images}
              keyExtractor={item => item._id}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <Image
                    className="m-2 rounded-lg"
                    style={{height: 100, width: 100}}
                    source={{uri: item?.URL || ''}}
                  />
                );
              }}
            />
          </View>

          <View className="p-2 mx-2 border-gray-300  border-b">
            <Text className="text-black font-bold text-md">Description</Text>
            <View>
              <Text className="text-black text-xs">{Hotel.description}</Text>
            </View>
          </View>

          <View className="p-2 mx-2 border-gray-300  border-b">
            <Text className="text-black font-bold text-md">Details</Text>

            <FlatList
              data={Hotel.details}
              keyExtractor={item => item._id}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity className="bg-blue-400 m-2 rounded-lg p-2">
                    <Text className="text-white">{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>


          <View className="p-2 mx-2 border-gray-300  border-b">
            <View>
              <Text className="text-black font-bold text-md">Rooms</Text>
            </View>
            <FlatList
              data={RoomList[0]?.images}
              keyExtractor={item => item._id}
              horizontal={true}
              renderItem={({item}) => {
                console.log('Item room data:', item);
                return (
                  <TouchableOpacity className="flex items-center">
                    <Image
                      className="m-2 rounded-lg"
                      style={{height: 100, width: 100}}
                      source={{uri: item?.URL || ''}}
                    />
                    {/* <Text className="text-xs text-black ">Deluxe Room</Text> */}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HotelDetails;

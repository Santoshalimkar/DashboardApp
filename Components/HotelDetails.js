import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { useNavigation } from '@react-navigation/native';

const HotelDetails = ({route}) => {
  const navigation=useNavigation()
  const {id} = route.params;
  const [Hotel, setHotel] = useState([]);
  const [RoomList, setRoomList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [modalvisible, setmodalvisible] = useState(false);
  const [modalvisible2, setmodalvisible2] = useState(false);
  const [prevHotelData, setPrevHotelData] = useState([]);

  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    images:  [
      {
          "URL": "https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-room-11.jpg",
          "thumbnail": true,
          "format": "image/jpg",
          "description": "",
          "_id": "65a4eff07c297d48b62aa1b7",
          "createdAt": "2024-01-15T08:42:24.917Z",
          "updatedAt": "2024-01-15T08:42:24.917Z"
      },
      {
          "URL": "https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-room-12.jpg",
          "thumbnail": false,
          "format": "image/jpg",
          "description": "",
          "_id": "65a4eff07c297d48b62aa1b8",
          "createdAt": "2024-01-15T08:42:24.917Z",
          "updatedAt": "2024-01-15T08:42:24.917Z"
      },
      {
          "URL": "https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-room-13.jpg",
          "thumbnail": false,
          "format": "image/jpg",
          "description": "",
          "_id": "65a4eff07c297d48b62aa1b9",
          "createdAt": "2024-01-15T08:42:24.917Z",
          "updatedAt": "2024-01-15T08:42:24.917Z"
      },
      {
          "URL": "https://activet-life-public-images.s3.ap-south-1.amazonaws.com/hotel-management/novotel/novotel-room-14.jpg",
          "thumbnail": false,
          "format": "image/jpg",
          "description": "",
          "_id": "65a4eff07c297d48b62aa1ba",
          "createdAt": "2024-01-15T08:42:24.917Z",
          "updatedAt": "2024-01-15T08:42:24.917Z"
      }
  ],
    details: [
      {
        URL: '', // Optional image URL from front-end
        label: '1 single bed',
      },
      // ... other detail objects
    ],
    facilities: [
      {
        URL: '', // Optional image URL from front-end
        label: 'Sea view',
      },
      // ... other facility objects
    ],
    price: {
      amountPerDay: 11499,
      discount: 499,
      guests: 1,
      extraChargePerGuests: 2500,
      maximumGuests: 2,
    },
    extras: [
      {
        title: 'Good Breakfast',
        description: ['Extra charges'],
      },
      // ... other extra objects
    ],
  });

  useEffect(() => {
    const getInitialData = async () => {
      setTimeout(async () => {
        setInitialLoad(false);
      }, 1000);
    };

    getInitialData();
  }, []);

  const fetchHotelById = async hotelId => {
    try {
      const hotelResponse = await axios.get(
        `https://api-uat.activetlife.com/api/hotel-management/hotel/${hotelId}`,
      );

      const hotelToUpdate = hotelResponse.data.hotel;

      if (hotelToUpdate) {
        setHotel(hotelToUpdate);
        setPrevHotelData(hotelToUpdate)
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

  const fetchroomData = async getid => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken');

      const response = await axios.get(
        `https://api-uat.activetlife.com/api/hotel-management/property-owner/${getid}/rooms?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
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


  // delete hotel

  const handleDeleteHotel = async () => {
    const accessToken = await AsyncStorage.getItem('userToken');

    if (!accessToken) {
      console.error('Access token not found in local storage');
      return;
    }

    const url = `https://api-uat.activetlife.com/api/hotel-management/hotel/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        Alert.alert(`Hotel  successfully deleted`);
        navigation.goBack()
      } else {
        console.error('Error deleting hotel:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting hotel:', error.message);
    }
  };


  // for update hotel

  const handleUpdateChange = (field, value) => {
    setHotel((prevHotel) => ({
      ...prevHotel,
      [field]: value,
    }));
  };
  
    const handleUpdateHotel = async (updateid) => {

    const accessToken = await AsyncStorage.getItem('userToken');
  
      if (!accessToken) {
        console.error('Access token not found in local storage');
        return;
      }
  
      const url = `https://api-uat.activetlife.com/api/hotel-management/hotel/${updateid}`;
  
      try {
        const updatedFields = {};
  
        Object.keys(Hotel).forEach((field) => {
          if (Hotel[field] !== prevHotelData[field]) {
            updatedFields[field] = Hotel[field];
          }
        }); 
        const response = await fetch(url, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedFields),
        });
  
        if (response.ok) {
          console.log(`Hotel  successfully updated`);
          fetchHotelById(id); 
        } else {
          console.error(
            'Error updating hotel:',
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error updating hotel:', error.message);
      }
      setmodalvisible(false)
    };
  
// for add room

const handleChangeroom = (field, value) => {
  setRoomData({ ...roomData, [field]: value });
};

const handleAddRoom = async (hotelId) => {

  const accessToken = await AsyncStorage.getItem('userToken');

  if (!accessToken) {
    console.error('Access token not found in local storage');
    return;
  }

  const roomDataWithHotelId = {
    ...roomData,
    hotel: hotelId,
  };

  const url = 'https://api-uat.activetlife.com/api/hotel-management/hotel-room';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(roomDataWithHotelId),
    });

    if (response.ok) {
      fetchroomData(id)
      Alert.alert('Room added successfully');
    } else {
      console.error(
        'Error sending room data to the server:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('Error sending room data:', error.message);
  }

  setmodalvisible2(false);
};


  return (
    <>
      {initialLoad ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgb(0,0,0,0.3)',
          }}
          className="absolute h-screen  flex-1 justify-center items-center    w-full  ">
          <View
            style={{elevation: 2}}
            className="absolute  flex justify-center items-center h-14 w-14  rounded-full  bg-white ">
            <ActivityIndicator size="large" color="#239BFC"></ActivityIndicator>
          </View>
        </View>
      ) : (
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon color="white" size={25} icon={faArrowLeft} />
              </TouchableOpacity>
            </View>

            <ScrollView className=" h-[500px]">
              <View className="p-2 mx-2 border-gray-300  border-b flex flex-row justify-between items-start ">
                <View>
                  <Text className="text-black font-bold text-lg">
                    {Hotel.name}
                  </Text>
                  <Text className="text-black font-medium text-xs pb-3">
                    {Hotel.address}
                  </Text>
                </View>

                <View className="flex flex-row items-center gap-4 pt-1">
                  <TouchableOpacity onPress={handleDeleteHotel}>
                    <FontAwesomeIcon size={20} color='red' icon={faTrash} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setmodalvisible(true)}>
                    <FontAwesomeIcon  size={20} color='rgb(96,165,250)' icon={faPenToSquare} />
                  </TouchableOpacity>
                </View>
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
                <Text className="text-black font-bold text-md">
                  Description
                </Text>
                <View>
                  <Text className="text-black text-xs">
                    {Hotel.description}
                  </Text>
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
                <View className='flex flex-row justify-between items-center'>
                  <Text className="text-black font-bold text-md">Rooms</Text>
                  <TouchableOpacity onPress={()=>setmodalvisible2(true)} className='bg-blue-400 p-1 rounded-xl'>
                    <Text className='text-white'>Add Room</Text>
                  </TouchableOpacity>
                </View>
                {RoomList.length>0?<FlatList
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
                />:<View className='flex justify-center items-center h-24'>
                  <Text className='text-black text-sm text-center  '>No Room Added</Text>
                </View>}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

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
                value={Hotel.name}
                onChangeText={text => handleUpdateChange('name', text)}
                autoCapitalize="none"
              />
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="address"
                value={Hotel.address}
                onChangeText={text => handleUpdateChange("address", text)}
                autoCapitalize="none"
              />
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="description"
                value={Hotel.description}
                onChangeText={text => handleUpdateChange("description", text)}
                autoCapitalize="none"
              />
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="minimumPrice"
                value={Hotel.minimumPrice}
                onChangeText={text => handleUpdateChange("minimumPrice", text)}
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
                onPress={()=>handleUpdateHotel(id)}
                className="bg-blue-400 rounded-md h-8 w-20 p-1">
                <Text className="text-white text-center">Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalvisible2}
        onRequestClose={() => {
          setmodalvisible2(!modalvisible2);
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
              className="text-gray-800 p-2 font-bold mt-4">Add Room</Text>
            <View className="w-full flex gap-4 mt-2">
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="name"
                value={roomData.name}
                onChangeText={text => handleChangeroom('name', text)}
                autoCapitalize="none"
              />
             
              <TextInput
                className="border border-gray-200 w-full text-gray-800 rounded-md pl-3 bg-gray-50"
                placeholderTextColor={'black'}
                placeholder="description"
                value={roomData.description}
                onChangeText={text => handleChangeroom("description", text)}
                autoCapitalize="none"
              />
             
            </View>

            <View className="flex flex-row items-center gap-2 ml-auto p-2 mt-2">
              <TouchableOpacity
                onPress={() => {
                  setmodalvisible2(!modalvisible2);
                }}
                className="bg-red-400 rounded-md h-8 w-20 p-1">
                <Text className="text-white text-center ">Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>handleAddRoom(id)}
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

export default HotelDetails;

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkTokenInAsyncStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('userToken');
    return Boolean(accessToken);
  } catch (error) {
    console.error('Error checking token in AsyncStorage:', error);
    return false;
  }
};


const initialState = {
    isLogged: false, 
};

const setInitialIsLoggedState = async () => {
  const hasToken = await checkTokenInAsyncStorage();
  initialState.isLogged = hasToken;
};

setInitialIsLoggedState(); 


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
      
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

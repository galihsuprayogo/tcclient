import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const service = axios.create({
  baseURL: 'http://192.168.10.106:8000',
});

export const storeUser = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteToken = () => { AsyncStorage.removeItem('@token'); };

export const deleteId = () => { AsyncStorage.removeItem('@id'); };

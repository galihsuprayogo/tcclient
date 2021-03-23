import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const service = axios.create({
  baseURL: 'http://apicoffee.brokilo.com/apicoffee',
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

export const deleteConsumer = () => { AsyncStorage.removeItem('consumer'); };

export const deleteCoffees = () => { AsyncStorage.removeItem('coffees'); };

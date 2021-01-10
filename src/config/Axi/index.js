import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const service = axios.create({
  baseURL: 'http://192.168.10.110:8000',
});

export const deleteToken = () => { AsyncStorage.removeItem('@token'); };

export const deleteId = () => { AsyncStorage.removeItem('@id'); };

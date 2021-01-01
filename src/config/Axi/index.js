import axios from 'axios';
import { AsyncStorage } from 'react-native';

const origin = 'http://192.168.10.106:8000';
export const service = axios.create({
  baseURL: 'http://192.168.10.106:8000',
  // timeout: 10000
});

export const AuthUp = (method, url, form) => {
  axios({
    method,
    url: `${origin}${url}`,
    data: {
      name: form.name,
      phone_number: form.phone_number
    }
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
};

export const setToken = (method, form) => {
  axios({
    method,
    url: 'http://192.168.10.106:8000/api/auth/verify',
    data: {
      phone_otp: form.phone_otp
    }
  }).then((response) => {
    AsyncStorage.setItem('@token', JSON.stringify(response.data.token));
  }).catch((error) => {
    console.log(error);
  });
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    const a = console.log(JSON.parse(token));
    return a;
  } catch (error) {
    console.log(error);
  }
};

export const deleteToken = () => { AsyncStorage.removeItem('@token'); };

export const deleteId = () => { AsyncStorage.removeItem('@id'); };

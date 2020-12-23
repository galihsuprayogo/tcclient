import axios from 'axios';

const origin = 'http://192.168.10.105:8000';
export const APIRoot = axios.create({
  baseURL: 'http://192.168.10.105:8000',
  timeout: 10000
});

export const postAuth = (form) => {
  APIRoot.post('/api/auth/signup', {
    name: form.name,
    phone_number: form.phone_number
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
};

export const Auth = (method, form) => {
  axios({
    method,
    url: 'http://192.168.10.105:8000/api/auth/signup',
    data: {
      name: form.name,
      phone_number: form.phone_number
    }
  });
};

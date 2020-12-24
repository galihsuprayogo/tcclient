import axios from 'axios';

const origin = 'http://192.168.10.105:8000';
// export const service = axios.create({
//   baseURL: origin,
//   timeout: 10000
// });

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

export const AuthIn = (method, url, form) => {
  axios({
    method,
    url: `${origin}${url}`,
    data: {
      phone_number: form.phone_number
    }
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
};

import axios from 'axios';
import store from '../Redux/Store';
const tokenAxios = axios.create();


// Request interceptors for API calls
tokenAxios.interceptors.request.use(
    config => {
      const token = store.getState().userReducer.user.token;
      config.headers['Authorization'] = token;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );


// tokenAxios.interceptors.request.use(req => {
//     // const token = store.getState().userReducer.user.token;
//     // req.headers = { 'authorization': token }
//     // req.headers.set('Authorization', token);

//     return req;
// })


export default tokenAxios;
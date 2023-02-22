import axios from 'axios';
import store from '../Redux/Store';
const tokenAxios = axios.create();

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

export default tokenAxios;
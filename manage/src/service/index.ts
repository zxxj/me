import axios from 'axios';
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 5000,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
  },
);

http.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  (error) => {
    console.log(error);
    return error.response.data;
  },
);

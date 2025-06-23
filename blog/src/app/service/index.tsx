import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 10000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'));
    }

    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

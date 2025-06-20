import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 10000,
});

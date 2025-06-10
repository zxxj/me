import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

class XinRequest {
  instance: AxiosInstance;

  constructor(config: InternalAxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  request(config: InternalAxiosRequestConfig) {
    return this.instance.request(config);
  }
}

export default XinRequest;

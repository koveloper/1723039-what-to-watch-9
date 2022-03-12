import axios, { AxiosRequestConfig } from 'axios';
import { token } from '../services/token';
import { BASE_TIMEOUT_MS, BASE_URL } from './constants';

export const getNetworkInstance = () => {
  const network = axios.create({
    baseURL: BASE_URL,
    timeout: BASE_TIMEOUT_MS,
  });
  network.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const tokenValue = token.get();
      if (tokenValue) {
        config.headers['x-token'] = tokenValue;
      }
      return config;
    },
  );
  return network;
};

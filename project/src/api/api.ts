import axios, { AxiosRequestConfig } from 'axios';
import { token } from '../services/token';
import { store } from '../store';
import { BASE_TIMEOUT_MS, BASE_URL } from './constants';
import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction } from './thunks';

const getAxiosInstance = () => {
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


export const api = {
  network: getAxiosInstance(),
  fetchFilms: () => store.dispatch(fetchFilmsAction()),
  fetchPromoFilm: () => store.dispatch(fetchPromoFilmAction()),
  checkAuth: () => store.dispatch(checkAuthAction()),
};

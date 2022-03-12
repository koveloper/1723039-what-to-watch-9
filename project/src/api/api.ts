import axios, { AxiosInstance } from 'axios';
import { store } from '../store';
import { BASE_TIMEOUT_MS, BASE_URL } from './constants';
import { fetchFilmsAction, fetchPromoFilmAction } from './thunks';

type Api = {
    network: AxiosInstance;
    fetchFilms: () => void;
    fetchPromoFilm: () => void;
}

const network = axios.create({
  baseURL: BASE_URL,
  timeout: BASE_TIMEOUT_MS,
});

export const api:Api = {
  network,
  fetchFilms: () => store.dispatch(fetchFilmsAction()),
  fetchPromoFilm: () => store.dispatch(fetchPromoFilmAction()),
};

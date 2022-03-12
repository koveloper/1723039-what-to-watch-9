import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store';
import { setFilms, setPromoFilm } from '../store/action';
import { FilmDataType, Films } from '../types/film-data-type';
import { api } from './api';
import { APIRoute } from './constants';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.network.get<Films>(APIRoute.Films);
      store.dispatch(setFilms(data));
    } catch (error) {
      // errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const {data} = await api.network.get<FilmDataType>(APIRoute.PromoFilm);
      store.dispatch(setPromoFilm(data));
    } catch (error) {
      // errorHandle(error);
    }
  },
);

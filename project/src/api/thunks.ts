import { createAsyncThunk } from '@reduxjs/toolkit';
import { token } from '../services/token';
import { store } from '../store';
import { setAuthStatus, setFilms, setPromoFilm } from '../store/action';
import { AuthStatus } from '../store/constants';
import { FilmDataType, Films } from '../types/film-data-type';
import { UserType } from '../types/user-type';
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

export const checkAuthAction = createAsyncThunk(
  'data/auth',
  async () => {
    try {
      const {data} = await api.network.get<UserType>(APIRoute.Login);
      store.dispatch(setAuthStatus(AuthStatus.Authorized));
      token.save(data.token);
    } catch (error) {
      // errorHandle(error);
    }
  },
);

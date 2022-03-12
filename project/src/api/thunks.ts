import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store';
import { setAuthStatus, setFilms, setPromoFilm, setUserData } from '../store/action';
import { AuthStatus } from '../store/constants';
import { FilmDataType, Films } from '../types/film-data-type';
import { UserType } from '../types/user-type';
import { api } from './api';
import { APIRoute } from './constants';
import { LoginData } from '../types/login-data';
import { token } from '../services/token';

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
  'data/auth/get',
  async () => {
    try {
      const {data} = await api.network.get<UserType>(APIRoute.Login);
      store.dispatch(setAuthStatus(AuthStatus.Authorized));
      store.dispatch(setUserData(data));
    } catch (error) {
      // errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'data/auth/post',
  async ({login: email, password}: LoginData) => {
    try {
      const {data} = await api.network.post<UserType>(APIRoute.Login, {email, password});
      token.save(data.token);
      store.dispatch(setAuthStatus(AuthStatus.Authorized));
      store.dispatch(setUserData(data));
    } catch (error) {
      // errorHandle(error);
    }
  },
);

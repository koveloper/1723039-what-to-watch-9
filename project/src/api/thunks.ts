import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store';
import { AuthStatus } from '../store/constants';
import { FilmComments, FilmData, FilmFullData, Films } from '../types/film-data-type';
import { UserType } from '../types/user-type';
import { api } from './api';
import { APIRoute } from './constants';
import { LoginData } from '../types/login-data';
import { token } from '../services/token';
import { CommentForPost, Comments } from '../types/commentary';
import { setFilms, setFullDataFilm, setPromoFilm, updateComments } from '../store/films-process/films-process';
import { changeFavoriteFilmState, setAuthStatus, setFavoriteFilms, setUserData } from '../store/user-process/user-process';
import { setRedirect } from '../store/service-process/service-process';
import { AppRoute } from '../utils/constants';

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
      const {data} = await api.network.get<FilmData>(APIRoute.PromoFilm);
      store.dispatch(setPromoFilm(data));
    } catch (error) {
      // errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'data/getAuth',
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
  'data/postAuth',
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

export const getFullDataFilmAction = createAsyncThunk(
  'data/getSelectedFilm',
  async (id: number) => {
    try {
      const {data: film} = await api.network.get<FilmData>(APIRoute.Film(id));
      const {data: similar} = await api.network.get<Films>(APIRoute.SimilarFilms(id));
      const {data: comments} = await api.network.get<Comments>(APIRoute.Comments(id));
      store.dispatch(setFullDataFilm({
        id,
        data: film,
        comments,
        similar,
      } as FilmFullData));
    } catch (error) {
      //
    }
  },
);

export const postCommentAction = createAsyncThunk(
  'data/postFilmComment',
  async ({id, rating, comment}: CommentForPost) => {
    try {
      const {data} = await api.network.post<Comments>(APIRoute.Comments(id), {comment, rating});
      store.dispatch(updateComments({
        id: id,
        comments: data,
      } as FilmComments));

      store.dispatch(setRedirect(`${AppRoute.Films}/${id}`));
    } catch (error) {
      //
    }
  },
);

export const getFavoriteFilms = createAsyncThunk(
  'data/getFavoriteFilms',
  async () => {
    try {
      const {data} = await api.network.get<Films>(APIRoute.FavoriteFilms);
      store.dispatch(setFavoriteFilms(data.map((film) => film.id)));
    } catch (error) {
      //
    }
  },
);

export const setFavoriteFilm = createAsyncThunk(
  'data/setFavoriteFilm',
  async ({id, isFavorite}: {id: number, isFavorite: boolean}) => {
    try {
      const {data} = await api.network.post<FilmData>(APIRoute.SetFavoriteFilm(id, isFavorite));
      store.dispatch(changeFavoriteFilmState(data));
    } catch (error) {
      //
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store';
import { AuthStatus } from '../store/constants';
import { FilmDataType, Films } from '../types/film-data-type';
import { UserType } from '../types/user-type';
import { api } from './api';
import { APIRoute } from './constants';
import { LoginData } from '../types/login-data';
import { token } from '../services/token';
import { CommentForPost, Comments } from '../types/commentary';
import { changeFilmData, setFilms, setPromoFilm } from '../store/films-process/films-process';
import { changeFavoriteFilmState, setAuthStatus, setFavoriteFilms, setUserData } from '../store/user-process/user-process';
import { setComments, setFilmsLikeSelected, setSelectedFilm, setUserComment, updateSelectedFilm } from '../store/selected-film-process/selected-film-process';

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

export const getSelectedFilmAction = createAsyncThunk(
  'data/getSelectedFilm',
  async (id: number) => {
    try {
      const {data} = await api.network.get<FilmDataType>(APIRoute.Film(id));
      const {filmData: selectedFilm} = store.getState().selectedFilm;
      if(selectedFilm && selectedFilm.id === data.id) {
        return;
      }
      store.dispatch(setSelectedFilm(data));
    } catch (error) {
      store.dispatch(setSelectedFilm(null));
    }
  },
);

export const getFilmsLikeSelectedAction = createAsyncThunk(
  'data/getFilmsLikeSelected',
  async (id: number) => {
    try {
      const {data} = await api.network.get<Films>(APIRoute.SimilarFilms(id));
      store.dispatch(setFilmsLikeSelected(data.filter((film) => film.id !== id)));
    } catch (error) {
      store.dispatch(setFilmsLikeSelected(null));
    }
  },
);

export const getCommentsAction = createAsyncThunk(
  'data/getFilmComments',
  async (id: number) => {
    try {
      const {data} = await api.network.get<Comments>(APIRoute.Comments(id));
      store.dispatch(setComments(data));
    } catch (error) {
      store.dispatch(setComments(null));
    }
  },
);

export const postCommentAction = createAsyncThunk(
  'data/postFilmComment',
  async ({id, rating, comment}: CommentForPost) => {
    try {
      const {data} = await api.network.post<Comments>(APIRoute.Comments(id), {comment, rating});
      store.dispatch(setComments(data));
      store.dispatch(setUserComment({id, rating, comment}));
    } catch (error) {
      store.dispatch(setUserComment(null));
    }
  },
);

export const getFavoriteFilms = createAsyncThunk(
  'data/getFavoriteFilms',
  async () => {
    try {
      const {data} = await api.network.get<Films>(APIRoute.FavoriteFilms);
      store.dispatch(setFavoriteFilms(data));
    } catch (error) {
      //
    }
  },
);

export const setFavoriteFilm = createAsyncThunk(
  'data/setFavoriteFilm',
  async ({id, isFavorite}: {id: number, isFavorite: boolean}) => {
    try {
      const {data} = await api.network.post<FilmDataType>(APIRoute.SetFavoriteFilm(id, isFavorite));
      console.log(data);
      store.dispatch(changeFavoriteFilmState(data));
      store.dispatch(changeFilmData(data));
      store.dispatch(updateSelectedFilm(data));
    } catch (error) {
      //
    }
  },
);

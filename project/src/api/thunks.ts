import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthStatus } from '../store/constants';
import { FilmComments, FilmData, FilmFullData, Films } from '../types/film-data-type';
import { UserType } from '../types/user-type';
import { APIRoute } from './constants';
import { LoginData } from '../types/login-data';
import { token } from '../services/token';
import { CommentForPost, Comments } from '../types/commentary';
import { setFilms, setFullDataFilm, setPromoFilm, updateComments } from '../store/films-process/films-process';
import { changeFavoriteFilmState, setAuthStatus, setFavoriteFilms, setUserData } from '../store/user-process/user-process';
import { setAppError, setRedirect } from '../store/service-process/service-process';
import { AppError, AppRoute } from '../utils/constants';
import { AppDispatch, AppErrorType } from '../store/types';
import { AxiosInstance } from 'axios';

/**
 * Function generates directly independent from store and axios thunks
 * @param dispatch - function for dispatching action to store
 * @param network - axios instance
 * @returns object with create actions methods
 */
export const createAsyncActions = (dispatch: AppDispatch, network: AxiosInstance) => ({
  fetchFilmsAction: createAsyncThunk(
    'data/fetchFilms',
    async () => {
      try {
        const {data} = await network.get<Films>(APIRoute.Films);
        dispatch(setFilms(data));
      } catch (error) {
        // errorHandle(error);
      }
    },
  ),

  fetchPromoFilmAction: createAsyncThunk(
    'data/fetchPromoFilm',
    async () => {
      try {
        const {data} = await network.get<FilmData>(APIRoute.PromoFilm);
        dispatch(setPromoFilm(data));
      } catch (error) {
        // errorHandle(error);
      }
    },
  ),

  checkAuthAction: createAsyncThunk(
    'data/getAuth',
    async () => {
      try {
        const {data} = await network.get<UserType>(APIRoute.Login);
        dispatch(setAuthStatus(AuthStatus.Authorized));
        dispatch(setUserData(data));
      } catch (error) {
        // errorHandle(error);
      }
    },
  ),

  loginAction: createAsyncThunk(
    'data/postAuth',
    async ({login: email, password}: LoginData) => {
      try {
        const {data} = await network.post<UserType>(APIRoute.Login, {email, password});
        token.save(data.token);
        dispatch(setAuthStatus(AuthStatus.Authorized));
        dispatch(setUserData(data));
      } catch (error) {
        // errorHandle(error);
      }
    },
  ),

  logoutAction: createAsyncThunk(
    'data/deleteAuth',
    async () => {
      try {
        const {status} = await network.delete(APIRoute.Logout);
        if(status !== 204) {
          throw new Error(`Unexpected server response code ${status} on /logout`);
        }
        dispatch(setAuthStatus(AuthStatus.UnAuthorized));
        dispatch(setUserData(null));
      } catch (error) {
        // errorHandle(error);
      }
    },
  ),

  getFullDataFilmAction: createAsyncThunk(
    'data/getSelectedFilm',
    async (id: number) => {
      try {
        const {data: film} = await network.get<FilmData>(APIRoute.Film(id));
        const {data: similar} = await network.get<Films>(APIRoute.SimilarFilms(id));
        const {data: comments} = await network.get<Comments>(APIRoute.Comments(id));
        dispatch(setFullDataFilm({
          id,
          data: film,
          comments,
          similar,
        } as FilmFullData));
      } catch (error) {
        dispatch(setRedirect(AppRoute.Err404));
      }
    },
  ),

  postCommentAction: createAsyncThunk(
    'data/postFilmComment',
    async ({id, rating, comment}: CommentForPost) => {
      try {
        const {data} = await network.post<Comments>(APIRoute.Comments(id), {comment, rating});
        dispatch(updateComments({
          id: id,
          comments: data,
        } as FilmComments));
        dispatch(setRedirect(`${AppRoute.Films}/${id}`));
      } catch (err) {
        dispatch(setAppError({
          type: AppError.PostReview,
          message: (err as Error).message,
        } as AppErrorType));
      }
    },
  ),

  getFavoriteFilms: createAsyncThunk(
    'data/getFavoriteFilms',
    async () => {
      try {
        const {data} = await network.get<Films>(APIRoute.FavoriteFilms);
        dispatch(setFavoriteFilms(data.map((film) => film.id)));
      } catch (error) {
        //
      }
    },
  ),

  setFavoriteFilm: createAsyncThunk(
    'data/setFavoriteFilm',
    async ({id, isFavorite}: {id: number, isFavorite: boolean}) => {
      try {
        const {data} = await network.post<FilmData>(APIRoute.SetFavoriteFilm(id, isFavorite));
        dispatch(changeFavoriteFilmState(data));
      } catch (error) {
        //
      }
    },
  ),
});

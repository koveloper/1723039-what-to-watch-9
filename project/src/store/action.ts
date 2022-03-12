import { createAction } from '@reduxjs/toolkit';
import { Comments } from '../types/commentary';
import { FilmDataType, Films } from '../types/film-data-type';
import { UserWithoutTokenType } from '../types/user-type';
import { AuthStatus } from './constants';

export const setGenre = createAction<string>('genre/set');

export const showMoreFilms = createAction('films/show/more');

export const resetShownFilmsCount = createAction('films/show/reset');

export const setFilms = createAction<Films>('films/set');

export const setPromoFilm = createAction<FilmDataType>('films/promo/set');

export const setAuthStatus = createAction<AuthStatus>('user/auth/set');

export const setUserData = createAction<UserWithoutTokenType>('user/data/set');

export const setSelectedFilm = createAction<FilmDataType | null | undefined>('films/selected/set');

export const setFilmsLikeSelected = createAction<Films | null>('films/selected-like/set');

export const setComments = createAction<Comments | null>('films/selected/comments/set');

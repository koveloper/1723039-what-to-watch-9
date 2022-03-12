import { createAction } from '@reduxjs/toolkit';
import { FilmDataType, Films } from '../types/film-data-type';

export const setGenre = createAction<string>('genre/set');

export const showMoreFilms = createAction('films/show/more');

export const resetShownFilmsCount = createAction('films/show/reset');

export const setFilms = createAction<Films>('films/set');

export const setPromoFilm = createAction<FilmDataType>('films/promo/set');

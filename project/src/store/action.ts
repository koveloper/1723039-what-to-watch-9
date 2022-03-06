import { createAction } from '@reduxjs/toolkit';

export const setGenre = createAction<string>('genre/set');

export const showMoreFilms = createAction('films/show/more');

export const resetShownFilmsCount = createAction('films/show/reset');

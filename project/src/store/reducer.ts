import { createReducer } from '@reduxjs/toolkit';
import { State } from './types';
import { ALL_GENRES, FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP } from '../utils/constants';
import { setFilms, resetShownFilmsCount, setGenre, showMoreFilms, setPromoFilm, setAuthStatus } from './action';
import { AuthStatus } from './constants';

const initialState:State = {
  genre: ALL_GENRES,
  films: null,
  promoFilm: null,
  maxFilmsOnPage: FILMS_ON_PAGE_INITIAL,
  authStatus: AuthStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(showMoreFilms, (state) => {
      state.maxFilmsOnPage += FILMS_ON_PAGE_STEP;
    })
    .addCase(resetShownFilmsCount, (state) => {
      state.maxFilmsOnPage = FILMS_ON_PAGE_INITIAL;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    });
});

export {reducer};

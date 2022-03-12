import { createReducer } from '@reduxjs/toolkit';
import { State } from './types';
import { ALL_GENRES, FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP } from '../utils/constants';
import { setFilms, resetShownFilmsCount, setGenre, showMoreFilms, setPromoFilm } from './action';

const initialState:State = {
  genre: ALL_GENRES,
  films: null,
  promoFilm: null,
  maxFilmsOnPage: FILMS_ON_PAGE_INITIAL,
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
    });
});

export {reducer};

import { createReducer } from '@reduxjs/toolkit';
import { films as allFilms } from '../mock/films';
import { State } from '../types/state';
import { ALL_GENRES, FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP } from '../utils/constants';
import { resetShownFilmsCount, setGenre, showMoreFilms } from './action';

const initialState:State = {
  genre: ALL_GENRES,
  films: allFilms.slice(),
  maxFilmsOnPage: FILMS_ON_PAGE_INITIAL,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      if(state.genre === action.payload) {
        return;
      }
      state.genre = action.payload;
      state.films = state.genre === ALL_GENRES
        ? allFilms.slice()
        : allFilms.filter((film) => film.genre === state.genre);
    })
    .addCase(showMoreFilms, (state) => {
      state.maxFilmsOnPage += FILMS_ON_PAGE_STEP;
    })
    .addCase(resetShownFilmsCount, (state) => {
      state.maxFilmsOnPage = FILMS_ON_PAGE_INITIAL;
    });
});

export {reducer};

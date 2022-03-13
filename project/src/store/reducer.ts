import { createReducer } from '@reduxjs/toolkit';
import { State } from './types';
import { ALL_GENRES, FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP } from '../utils/constants';
import { setFilms, resetShownFilmsCount, setGenre, showMoreFilms, setPromoFilm, setAuthStatus, setUserData, setSelectedFilm, setFilmsLikeSelected, setComments, setUserComment } from './action';
import { AuthStatus } from './constants';

const initialState:State = {
  genre: ALL_GENRES,
  films: null,
  promoFilm: null,
  maxFilmsOnPage: FILMS_ON_PAGE_INITIAL,
  authStatus: AuthStatus.Unknown,
  userData: null,
  selectedFilm: undefined,
  filmsLikeSelected: null,
  comments: null,
  userComment: undefined,
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
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setSelectedFilm, (state, action) => {
      state.selectedFilm = action.payload;
    })
    .addCase(setFilmsLikeSelected, (state, action) => {
      state.filmsLikeSelected = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setUserComment, (state, action) => {
      state.userComment = action.payload;
    });
});

export {reducer};

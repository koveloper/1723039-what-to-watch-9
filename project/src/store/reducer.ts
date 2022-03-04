import { createReducer } from '@reduxjs/toolkit';
import { films as allFilms } from '../mock/films';
import { State } from '../types/state';
import { ALL_GENRES } from '../utils/constants';
import { setGenre } from './action';


const initialState:State = {
  genre: ALL_GENRES,
  films: allFilms.slice(),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
      state.films = state.genre === ALL_GENRES
        ? allFilms.slice()
        : allFilms.filter((film) => film.genre === state.genre);
    });
});

export {reducer};

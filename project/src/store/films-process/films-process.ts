import { createSlice } from '@reduxjs/toolkit';
import { FilmComments, FilmFullData } from '../../types/film-data-type';
import { NameSpace } from '../../utils/constants';
import { FilmsState } from '../types';

const initialState: FilmsState = {
  films: null,
  promoFilm: null,
  fullDataFilms: {},
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setFilms(state, action) {
      state.films = action.payload;
    },
    setPromoFilm(state, action) {
      state.promoFilm = action.payload;
    },
    setFullDataFilm(state, action) {
      const data = action.payload as FilmFullData;
      state.fullDataFilms[data.id] = data;
    },
    updateComments(state, action) {
      const data = action.payload as FilmComments;
      state.fullDataFilms[data.id].comments = data.comments;
    },
  },
});

export const {setFilms, setPromoFilm, setFullDataFilm, updateComments} = filmsProcess.actions;

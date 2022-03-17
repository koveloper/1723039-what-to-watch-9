import { createSlice } from '@reduxjs/toolkit';
import { FilmDataType } from '../../types/film-data-type';
import { NameSpace } from '../../utils/constants';
import { FilmsState } from '../types';

const initialState: FilmsState = {
  films: null,
  promoFilm: null,
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
    changeFilmData(state, action) {
      const filmData:FilmDataType = action.payload;
      if(state.films === null) {
        return;
      }
      const index = state.films.findIndex((f) => f.id === filmData.id);
      state.films.splice(index, 1, filmData);
    },
  },
});

export const {setFilms, setPromoFilm, changeFilmData} = filmsProcess.actions;

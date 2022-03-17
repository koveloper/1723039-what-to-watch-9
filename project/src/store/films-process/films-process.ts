import { createSlice } from '@reduxjs/toolkit';
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
  },
});

export const {setFilms, setPromoFilm} = filmsProcess.actions;

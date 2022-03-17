import { createSlice } from '@reduxjs/toolkit';
import { FilmDataType } from '../../types/film-data-type';
import { NameSpace } from '../../utils/constants';
import { SelectedFilmState } from '../types';

const initialState:SelectedFilmState = {
  filmData: undefined,
  filmsLikeSelected: null,
  comments: null,
  userComment: undefined,
};

export const selectedFilmProcess = createSlice({
  name: NameSpace.SelectedFilm,
  initialState,
  reducers: {
    setSelectedFilm(state, action){
      if(state.filmData && state.filmData.id === action.payload.id) {
        return;
      }
      state.filmData = action.payload;
    },
    setFilmsLikeSelected(state, action) {
      if(state.filmsLikeSelected && action.payload) {
        return;
      }
      state.filmsLikeSelected = action.payload;
    },
    setComments(state, action) {
      if(state.comments && action.payload) {
        return;
      }
      state.comments = action.payload;
    },
    resetSelectedFilm(state) {
      state.filmData = undefined;
      state.filmsLikeSelected = null;
      state.comments = null;
    },
    setUserComment(state, action) {
      state.userComment = action.payload;
    },
    updateSelectedFilm(state, action) {
      const filmData:FilmDataType = action.payload;
      if(state.filmData && state.filmData.id !== filmData.id) {
        return;
      }
      console.log('update selected film');
      state.filmData = filmData;
    },
  },
});

export const {setSelectedFilm, setFilmsLikeSelected, setComments, setUserComment, resetSelectedFilm, updateSelectedFilm} = selectedFilmProcess.actions;

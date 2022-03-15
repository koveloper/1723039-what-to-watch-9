import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../utils/constants';
import { SelectedFilmState } from '../types';

const initialState:SelectedFilmState = {
  selectedFilm: undefined,
  filmsLikeSelected: null,
  comments: null,
  userComment: undefined,
};

export const selectedFilmProcess = createSlice({
  name: NameSpace.SelectedFilm,
  initialState,
  reducers: {
    setSelectedFilm(state, action){
      state.selectedFilm = action.payload;
    },
    setFilmsLikeSelected(state, action) {
      state.filmsLikeSelected = action.payload;
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    setUserComment(state, action) {
      state.userComment = action.payload;
    },
  },
});

export const {setSelectedFilm, setFilmsLikeSelected, setComments, setUserComment} = selectedFilmProcess.actions;

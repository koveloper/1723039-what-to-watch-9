import { createSlice } from '@reduxjs/toolkit';
import { FilmDataType } from '../../types/film-data-type';
import { NameSpace } from '../../utils/constants';
import { AuthStatus } from '../constants';
import { UserState } from '../types';

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  userData: null,
  favoriteFilms: null,
};

export const userProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setAuthStatus(state, action) {
      state.authStatus = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setFavoriteFilms(state, action) {
      state.favoriteFilms = action.payload;
    },
    changeFavoriteFilmState(state, action) {
      const filmData:FilmDataType = action.payload;
      if(!state.favoriteFilms) {
        return;
      }
      const index = state.favoriteFilms.findIndex((f) => f.id === filmData.id);
      if(!filmData.isFavorite && index !== -1) {
        state.favoriteFilms.splice(index, 1);
      } else if(filmData.isFavorite) {
        state.favoriteFilms.push(filmData);
      }
    },
  },
});

export const {setAuthStatus, setUserData, setFavoriteFilms, changeFavoriteFilmState} = userProcess.actions;

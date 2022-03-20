import { createSlice } from '@reduxjs/toolkit';
import { FilmData } from '../../types/film-data-type';
import { NameSpace } from '../../utils/constants';
import { AuthStatus } from '../constants';
import { UserState } from '../types';

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  userData: null,
  favoriteFilmsIdList: null,
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
      state.favoriteFilmsIdList = action.payload;
    },
    changeFavoriteFilmState(state, action) {
      const filmData:FilmData = action.payload;
      if(!state.favoriteFilmsIdList) {
        return;
      }
      const index = state.favoriteFilmsIdList.findIndex((f) => f === filmData.id);
      if(!filmData.isFavorite && index !== -1) {
        state.favoriteFilmsIdList.splice(index, 1);
      } else if(filmData.isFavorite) {
        state.favoriteFilmsIdList.push(filmData.id);
      }
    },
  },
});

export const {setAuthStatus, setUserData, setFavoriteFilms, changeFavoriteFilmState} = userProcess.actions;

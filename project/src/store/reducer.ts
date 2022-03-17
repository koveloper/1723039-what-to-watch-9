import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/constants';
import { filmsProcess } from './films-process/films-process';
import { userProcess } from './user-process/user-process';
import { selectedFilmProcess } from './selected-film-process/selected-film-process';

export const reducer = combineReducers({
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.SelectedFilm]: selectedFilmProcess.reducer,
});

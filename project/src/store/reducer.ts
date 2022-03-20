import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/constants';
import { filmsProcess } from './films-process/films-process';
import { serviceProcess } from './service-process/service-process';
import { userProcess } from './user-process/user-process';

export const reducer = combineReducers({
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Service]: serviceProcess.reducer,
});

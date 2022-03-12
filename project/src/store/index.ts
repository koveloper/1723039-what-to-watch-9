import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { reducer } from './reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

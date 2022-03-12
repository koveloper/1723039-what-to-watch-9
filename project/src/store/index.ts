import { configureStore } from '@reduxjs/toolkit';
import { getNetworkInstance } from '../api/network';
import { reducer } from './reducer';

const axios = getNetworkInstance();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: axios,
    },
  }),
});

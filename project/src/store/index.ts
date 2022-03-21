import { configureStore } from '@reduxjs/toolkit';
import { getNetworkInstance } from '../api/network';
import { reducer } from './reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: getNetworkInstance(),
    },
  }),
});

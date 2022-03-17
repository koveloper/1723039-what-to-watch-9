import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../utils/constants';
import { ServiceState } from '../types';

const initialState: ServiceState = {
  redirect: null,
};

export const serviceProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setRedirect(state, action) {
      state.redirect = action.payload;
    },
  },
});

export const {setRedirect} = serviceProcess.actions;

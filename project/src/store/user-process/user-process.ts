import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../utils/constants';
import { AuthStatus } from '../constants';
import { UserState } from '../types';

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  userData: null,
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
  },
});

export const {setAuthStatus, setUserData} = userProcess.actions;

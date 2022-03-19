import { createFakeFavoriteFilmsIdList, createFakeUser } from '../../utils/mocks';
import { AuthStatus } from '../constants';
import { UserState } from '../types';
import { setAuthStatus, setFavoriteFilms, setUserData, userProcess } from './user-process';


describe('Reducer: userProcess', () => {
  const initialState:UserState = {
    authStatus: AuthStatus.Unknown,
    userData: null,
    favoriteFilmsIdList: null,
  };
  it('check for initial state on any non data call', () => {
    expect(userProcess.reducer(void 0, {type: 'some dummy action'}))
      .toEqual(initialState);
  });
  describe('authStatus tree', () => {
    it('on authorize SUCCESS', () => {
      expect(userProcess.reducer(initialState, setAuthStatus(AuthStatus.Authorized)))
        .toEqual(Object.assign({}, initialState, {authStatus: AuthStatus.Authorized}));
    });
    it('on authorize FAILS', () => {
      expect(userProcess.reducer(initialState, setAuthStatus(AuthStatus.UnAuthorized)))
        .toEqual(Object.assign({}, initialState, {authStatus: AuthStatus.UnAuthorized}));
    });
  });
  describe('userData tree', () => {
    const fakeUser = createFakeUser();
    it('on userData set', () => {
      expect(userProcess.reducer(initialState, setUserData(fakeUser)))
        .toEqual(Object.assign({}, initialState, {userData: fakeUser}));
    });
  });
  describe('favoriteFilms tree', () => {
    const fakeList = createFakeFavoriteFilmsIdList();
    it('on userData set', () => {
      expect(userProcess.reducer(initialState, setFavoriteFilms(fakeList)))
        .toEqual(Object.assign({}, initialState, {favoriteFilmsIdList: fakeList}));
    });
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { useAuth } from './use-auth';

describe('Hook: useAuth', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = {
    user: {
      authStatus: AuthStatus.Unknown,
      userData: null,
      favoriteFilmsIdList: null,
    },
    films: {
      all: null,
      promoFilm: null,
      fullDataFilms: {},
    },
    service: {
      redirect: null,
    },
  };

  it('should return boolean false on AuthStatus.Unknown', async () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.Unknown}}));
    const {result} = renderHook(
      () => useAuth(),
      {
        wrapper: ({ children }) => <Provider store={store} >{children}</Provider>,
      },
    );
    const value = result.current;
    expect(value).toBe(false);
  });

  it('should return boolean false on AuthStatus.UnAuthorized', async () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.UnAuthorized}}));
    const {result} = renderHook(
      () => useAuth(),
      {
        wrapper: ({ children }) => <Provider store={store} >{children}</Provider>,
      },
    );
    const value = result.current;
    expect(value).toBe(false);
  });

  it('should return boolean false on AuthStatus.Authorized', async () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.Authorized}}));
    const {result} = renderHook(
      () => useAuth(),
      {
        wrapper: ({ children }) => <Provider store={store} >{children}</Provider>,
      },
    );
    const value = result.current;
    expect(value).toBe(true);
  });
});

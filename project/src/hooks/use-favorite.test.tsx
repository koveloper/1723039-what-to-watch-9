import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { createInitialState } from '../utils/mocks';
import { useFavorite } from './use-favorite';

describe('Hook: useFavorite', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

  it('should return false on startup', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => useFavorite(0),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(false);
  });

  it('should return true or false after init in case of auth is ok', async () => {
    const favoriteFilmsIdList = [100, 105, 110, 117];
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          authStatus: AuthStatus.Authorized,
          favoriteFilmsIdList,
        },
      },
    ));
    for(const id of favoriteFilmsIdList){
      const {result} = renderHook(
        () => useFavorite(id),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toBe(true);
    }
    {
      const {result} = renderHook(
        () => useFavorite(-1),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toBe(false);
    }
  });
  it('should return false ONLY after init in case of NO auth', async () => {
    const favoriteFilmsIdList = [100, 105, 110, 117];
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          authStatus: AuthStatus.UnAuthorized,
          favoriteFilmsIdList,
        },
      },
    ));
    for(const id of favoriteFilmsIdList){
      const {result} = renderHook(
        () => useFavorite(id),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toBe(false);
    }
    {
      const {result} = renderHook(
        () => useFavorite(-1),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toBe(false);
    }
  });
});

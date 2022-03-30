import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { api } from '../api/api';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { createFakeFilms, createInitialState } from '../utils/mocks';
import { useFavorite } from './use-favorite';

describe('Hook: useFavorite', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();
  const favoriteFilmsIdList = [100, 105, 110, 117];
  const films = createFakeFilms(40);

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

  it('should return true or false after init in case of auth is ok and ALL data fetched', async () => {
    const films = createFakeFilms(40);
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: films,
        },
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

  it('should return false and call api method after init in case of auth is ok, films fetched, but NO favors fetched', async () => {
    const getFavorsMock = jest.fn();
    api.fetchFavoriteFilms = getFavorsMock;
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: films,
        },
        user: {
          authStatus: AuthStatus.Authorized,
        },
      },
    ));
    expect(getFavorsMock).toBeCalledTimes(0);
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
    expect(getFavorsMock).toBeCalledTimes(favoriteFilmsIdList.length);
  });
  it('should return false ONLY after init in case of NO auth', async () => {
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: films,
        },
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

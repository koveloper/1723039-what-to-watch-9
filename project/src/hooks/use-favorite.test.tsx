import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { useFavorite } from './use-favorite';

describe('Hook: useFavorite', () => {
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

  it('should return undefined on startup', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => useFavorite(0),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(undefined);
  });

  it('should return true or false after init', async () => {
    const favoriteFilmsIdList = [100, 105, 110, 117];
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          favoriteFilmsIdList,
        },
      },
    ));
    {
      const {result} = renderHook(
        () => useFavorite(favoriteFilmsIdList[1]),
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
});

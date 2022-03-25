import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { createFakeFilms } from '../utils/mocks';
import { useFavoriteFilms } from './use-favorite-films';

describe('Hook: useFavoriteFilms', () => {
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
      () => useFavoriteFilms(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(undefined);
  });

  it('should return null on favor films fetched but no films data fetched', async () => {
    const favoriteFilmsIdList = [100, 105, 110, 117];
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          favoriteFilmsIdList,
        },
      },
    ));
    const {result} = renderHook(
      () => useFavoriteFilms(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(null);
  });

  it('should return FilmData array on favor films and films fetched', async () => {
    const fakeFilms = createFakeFilms(33);
    const favoriteFilmsIdList = [100, 105, 110, 117];
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          favoriteFilmsIdList,
        },
        films: {
          all: fakeFilms,
        },
      },
    ));
    const {result} = renderHook(
      () => useFavoriteFilms(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBeInstanceOf(Array);
    expect(value).toStrictEqual(fakeFilms.filter((film) => favoriteFilmsIdList.find((id) => film.id === id)));
  });
});

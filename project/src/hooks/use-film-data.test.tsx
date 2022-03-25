import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { useFilmData } from './use-film-data';
import { createFakeFilms } from '../utils/mocks';

describe('Hook: useFilmData', () => {
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
      () => useFilmData(0),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(undefined);
  });

  it('should return null after init in case of wrong film id', async () => {
    const fakeFilms = createFakeFilms(33);
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
      },
    ));
    const {result} = renderHook(
      () => useFilmData(0),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(null);
  });

  it('should return FilmData after init in case of correct film id', async () => {
    const fakeFilms = createFakeFilms(33);
    const fakeFilmIndex = 17;
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
      },
    ));
    const {result} = renderHook(
      () => useFilmData(fakeFilms[fakeFilmIndex].id),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toStrictEqual(fakeFilms[fakeFilmIndex]);
  });
});

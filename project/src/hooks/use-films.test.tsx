import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { createFakeFilms } from '../utils/mocks';
import { useFilms } from './use-films';

describe('Hook: useFilms', () => {
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

  it('should return null on startup', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => useFilms(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(null);
  });

  it('should return films after init', async () => {
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
      () => useFilms(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBeInstanceOf(Array);
    expect(value).toStrictEqual(fakeFilms);
  });
});

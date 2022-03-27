import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { ALL_GENRES } from '../utils/constants';
import { createFakeFilms, createFakeGenres } from '../utils/mocks';
import { useGenres } from './use-genres';

describe('Hook: useGenres', () => {
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

  it('should return empty array on no data fetched', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => useGenres(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toStrictEqual([]);
  });

  it('should return genres list from films with ALL_GENRES as first element', async () => {
    const films = createFakeFilms(140);
    const genres = createFakeGenres();
    for(const f of films) {
      const genreIndex = Math.floor(Math.random() * genres.length);
      f.genre = genres[genreIndex];
    }
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: films,
        },
      },
    ));
      //check genres getting
    const {result} = renderHook(
      () => useGenres(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBeInstanceOf(Array);
    expect(value.length).toStrictEqual(genres.length + 1);
    const sortFunction = (a: string, b: string) => {
      if (a > b) {
        return -1;
      }
      if (b > a) {
        return 1;
      }
      return 0;
    };
    expect(value.sort(sortFunction)).toStrictEqual([ALL_GENRES, ...genres].sort(sortFunction));
  });
});

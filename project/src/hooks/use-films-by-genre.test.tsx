import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { ALL_GENRES } from '../utils/constants';
import { createFakeFilms, createFakeGenres } from '../utils/mocks';
import { useFilmsByGenre } from './use-films-by-genre';

describe('Hook: useFilmsByGenre', () => {
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
      () => useFilmsByGenre(ALL_GENRES),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toStrictEqual([]);
  });

  it('should return films filtered by genre on fetched data', async () => {
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
    //check filtering for all genres
    for(const genre of genres) {
      const {result} = renderHook(
        () => useFilmsByGenre(genre),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      const count = films.reduce((acc, f) => (acc + (f.genre === genre ? 1 : 0)), 0);
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBe(count);
    }
    {
      //check ALL_GENRES
      const {result} = renderHook(
        () => useFilmsByGenre(ALL_GENRES),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBe(films.length);
    }
    {
      //check for non exist genre
      const {result} = renderHook(
        () => useFilmsByGenre('askdjasjkdhasjdaslkdjaslkdj'),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toStrictEqual([]);
    }

  });
});

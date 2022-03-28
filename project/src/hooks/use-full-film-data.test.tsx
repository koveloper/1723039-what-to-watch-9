import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { State } from '../store/types';
import { createFakeFilmFullData, createInitialState } from '../utils/mocks';
import { useFullFilmData } from './use-full-film-data';

describe('Hook: useFullFilmData', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

  it('should return undefined on startup', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => useFullFilmData(0),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(undefined);
  });

  it('should return FilmDataFull after init in case of correct film id or undefined in case of wrong film id', async () => {
    const fakeFilm = createFakeFilmFullData();
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          fullDataFilms: {
            [fakeFilm.id]: fakeFilm,
          },
        },
      },
    ));
    {
      const {result} = renderHook(
        () => useFullFilmData(fakeFilm.id),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toStrictEqual(fakeFilm);
    }
    {
      const {result} = renderHook(
        () => useFullFilmData(-1),
        {
          wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
        },
      );
      const value = result.current;
      expect(value).toBe(undefined);
    }
  });
});

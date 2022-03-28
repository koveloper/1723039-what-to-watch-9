import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { State } from '../store/types';
import { createFakeFilmData, createInitialState } from '../utils/mocks';
import { usePromoFilm } from './use-promo-film';

describe('Hook: usePromoFilm', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

  it('should return null on startup', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => usePromoFilm(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(null);
  });

  it('should return FilmData after init', async () => {
    const promoFilm = createFakeFilmData();
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          promoFilm,
        },
      },
    ));
    const {result} = renderHook(
      () => usePromoFilm(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(promoFilm);
  });
});

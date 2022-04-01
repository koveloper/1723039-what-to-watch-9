import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { State } from '../store/types';
import { BrowserRouter } from 'react-router-dom';
import { useFilmButtonsDefaultHandler } from './use-film-buttons-default-handler';
import { createFakeFilms, createInitialState } from '../utils/mocks';
import { AppRoute, FilmCardButtonType } from '../utils/constants';
import { api } from '../api/api';

const mockedSetFavorite = jest.fn();
api.setFavoriteStatus = mockedSetFavorite;

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Hook: useFilmButtonsDefaultHandler', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();
  const fakeFilms = createFakeFilms(33);
  const fakeFilmNumber = 7;

  it('should return function', async () => {
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
      },
    ));

    const {result} = renderHook(
      () => useFilmButtonsDefaultHandler(fakeFilms[fakeFilmNumber].id),
      {
        wrapper: ({ children }) => (
          <Provider store={store} >
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </Provider>
        ),
      },
    );
    const callbackFunc = result.current;
    expect(callbackFunc).toBeInstanceOf(Function);
  });
  it('should redirect to Player page for play button', async () => {
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
      },
    ));

    const {result} = renderHook(
      () => useFilmButtonsDefaultHandler(fakeFilms[fakeFilmNumber].id),
      {
        wrapper: ({ children }) => (
          <Provider store={store} >
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </Provider>
        ),
      },
    );
    const callbackFunc = result.current;
    callbackFunc(FilmCardButtonType.Play);
    //check correct navigate to player
    expect(mockedNavigate).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(`${AppRoute.PlayerRoot}/${fakeFilms[fakeFilmNumber].id}`);
  });
  it('should redirect to AddReview page for review button', async () => {
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
      },
    ));

    const {result} = renderHook(
      () => useFilmButtonsDefaultHandler(fakeFilms[fakeFilmNumber].id),
      {
        wrapper: ({ children }) => (
          <Provider store={store} >
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </Provider>
        ),
      },
    );
    const callbackFunc = result.current;
    callbackFunc(FilmCardButtonType.AddReview);
    //check correct navigate to player
    expect(mockedNavigate).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(`${AppRoute.Films}/${fakeFilms[fakeFilmNumber].id}/review`);
  });

  it('should call setFavorite with favorite flag true for non favorite film', async () => {
    fakeFilms[fakeFilmNumber].isFavorite = false;
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
      },
    ));

    const {result} = renderHook(
      () => useFilmButtonsDefaultHandler(fakeFilms[fakeFilmNumber].id),
      {
        wrapper: ({ children }) => (
          <Provider store={store} >
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </Provider>
        ),
      },
    );
    const callbackFunc = result.current;
    callbackFunc(FilmCardButtonType.MyList);
    expect(mockedSetFavorite).toHaveBeenCalledWith(fakeFilms[fakeFilmNumber].id, true);
  });

  it('should call setFavorite with favorite flag false for favorite film', async () => {
    fakeFilms[fakeFilmNumber].isFavorite = true;
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
      },
    ));

    const {result} = renderHook(
      () => useFilmButtonsDefaultHandler(fakeFilms[fakeFilmNumber].id),
      {
        wrapper: ({ children }) => (
          <Provider store={store} >
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </Provider>
        ),
      },
    );
    const callbackFunc = result.current;
    callbackFunc(FilmCardButtonType.MyList);
    expect(mockedSetFavorite).toHaveBeenCalledWith(fakeFilms[fakeFilmNumber].id, true);
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { BrowserRouter } from 'react-router-dom';
import { useFilmButtonsDefaultHandler } from './use-film-buttons-default-handler';
import { createFakeFilms, createInitialState } from '../utils/mocks';
import { ButtonType } from '../components/film-card-buttons/constants';
import { AppRoute } from '../utils/constants';
import { api } from '../api/api';
import { setRedirect } from '../store/service-process/service-process';

// const mockedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedNavigate,
// }));

const mockedSetFavorite = jest.fn();
api.setFavoriteStatus = mockedSetFavorite;

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
    callbackFunc(ButtonType.Play);
    //check actions in queue after hook invoke
    expect(store.getActions().length).toBe(1);
    const redirectAction = store.getActions().find(({type}) => type === setRedirect.toString());
    expect(redirectAction).not.toBe(undefined);
    //check action payload
    expect(redirectAction && ('payload' in redirectAction) && redirectAction['payload']).toBe(`${AppRoute.PlayerRoot}/${fakeFilms[fakeFilmNumber].id}`);
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
    callbackFunc(ButtonType.AddReview);
    //check actions in queue after hook invoke
    expect(store.getActions().length).toBe(1);
    const redirectAction = store.getActions().find(({type}) => type === setRedirect.toString());
    expect(redirectAction).not.toBe(undefined);
    //check action payload
    expect(redirectAction && ('payload' in redirectAction) && redirectAction['payload']).toBe(`${AppRoute.Films}/${fakeFilms[fakeFilmNumber].id}/review`);
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
    callbackFunc(ButtonType.MyList);
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
    callbackFunc(ButtonType.MyList);
    expect(mockedSetFavorite).toHaveBeenCalledWith(fakeFilms[fakeFilmNumber].id, true);
  });
});

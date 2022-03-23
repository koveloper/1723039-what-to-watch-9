import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthStatus } from '../../store/constants';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import AuthWrapper from './auth-wrapper';

describe('Component: AuthWrapper', () => {
  const fakeChildren = 'fake-children';
  const fakeLogin = 'fake-login';
  const mockStore = configureMockStore<State, Action>();
  //create state initial state
  const initialState:State = {
    user: {
      authStatus: AuthStatus.Unknown,
      userData: null,
      favoriteFilmsIdList: null,
    },
    films: {
      films: null,
      promoFilm: null,
      fullDataFilms: {},
    },
    service: {
      redirect: null,
    },
  };

  it('should return fake children on authorization status is «auth»', async () => {
    //create mock store instance
    const store = mockStore(Object.assign(initialState, {
      user: {
        authStatus: AuthStatus.Authorized,
      },
    }));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path={'/login'}
              element={<h1>{fakeLogin}</h1>}
            />
            <Route
              path='/'
              element={<AuthWrapper component={<div>{fakeChildren}</div>}/>}
            />
          </Routes>
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByText(fakeChildren)).toBeInTheDocument();
  });
  //
  it('should redirect to login if authorization status is NOT «auth»', async () => {
    //create mock store instance
    const store = mockStore(Object.assign(initialState, {
      user: {
        authStatus: AuthStatus.UnAuthorized,
      },
    }));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path={'/login'}
              element={<h1>{fakeLogin}</h1>}
            />
            <Route
              path='/'
              element={<AuthWrapper component={<div>{fakeChildren}</div>}/>}
            />
          </Routes>
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByText(fakeLogin)).toBeInTheDocument();
  });
});

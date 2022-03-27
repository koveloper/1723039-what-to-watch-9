import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { AuthStatus } from '../../store/constants';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { api } from '../../api/api';
import { setRedirect } from '../../store/service-process/service-process';
import LogoutPage from './logout-page';

describe('Component: LogoutPage', () => {
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
  it('should spinner and call api.logout on authorized status', () => {
    api.logout = jest.fn();
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.Authorized}}));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LogoutPage />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
    expect(api.logout).toBeCalled();
  });
  it('should redirect to root on NON authorized status', () => {
    api.logout = jest.fn();
    for(const state of [AuthStatus.UnAuthorized, AuthStatus.Unknown]) {
      const store = mockStore(Object.assign(initialState, {user: {authStatus: state}}));
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LogoutPage />
          </BrowserRouter>
        </Provider>,
      );
      const redirectAction = store.getActions().find((a) => a.type === setRedirect.toString());
      expect(redirectAction).not.toBe(undefined);
      //check action payload
      expect(redirectAction && ('payload' in redirectAction) && redirectAction['payload']).toBe(AppRoute.Root);
      expect(api.logout).not.toBeCalled();
    }
  });
});

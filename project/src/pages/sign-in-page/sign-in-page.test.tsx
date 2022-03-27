import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { AuthStatus } from '../../store/constants';
import { Provider } from 'react-redux';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { AppRoute } from '../../utils/constants';
import { setRedirect } from '../../store/service-process/service-process';
import SignInPage from './sign-in-page';
import { createInitialState } from '../../utils/mocks';


describe('Component: SignInPage', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

  it('should render correctly on AuthStatus Unknown', () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.Unknown}}));
    const history:History = createMemoryHistory();
    history.push(AppRoute.SignIn);
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<SignInPage />} />
            <Route path='*' element={<div>404-err-page</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
    //check that email field on screen
    expect(screen.getAllByText('Sign in').length).toBe(2);
    //
    expect(screen.getByRole('button')).toBeInTheDocument();
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.textContent).toBe('Sign in');
  });

  it('should render correctly on AuthStatus UnAuthorized', () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.UnAuthorized}}));
    const history:History = createMemoryHistory();
    history.push(AppRoute.SignIn);
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<SignInPage />} />
            <Route path='*' element={<div>404-err-page</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
    //check that email field on screen
    expect(screen.getAllByText('Sign in').length).toBe(2);
    //
    expect(screen.getByRole('button')).toBeInTheDocument();
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.textContent).toBe('Sign in');
  });

  it('should invoke redirect on AuthStatus Authorized', () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.Authorized}}));
    const history:History = createMemoryHistory();
    history.push(AppRoute.SignIn);
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<SignInPage />} />
            <Route path='*' element={<div>404-err-page</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
    //check actions in queue after hook invoke
    expect(store.getActions().length).toBe(1);
    const redirectAction = store.getActions().find(({type}) => type === setRedirect.toString());
    expect(redirectAction).not.toBe(undefined);
    //check action payload
    expect(redirectAction && ('payload' in redirectAction) && redirectAction['payload']).toBe(AppRoute.Root);
  });
});

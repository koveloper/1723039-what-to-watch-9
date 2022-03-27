import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { useRedirectCheck } from './use-redirect-check';
import { BrowserRouter } from 'react-router-dom';
import { setRedirect } from '../store/service-process/service-process';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Hook: useRedirectCheck', () => {
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


  it('should no redirect on no redirect data in store', async () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.Unknown}}));
    const {result} = renderHook(
      () => useRedirectCheck(),
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
    const value = result.current;
    expect(value).toBe(false);
    expect(store.getActions()).toEqual([]);
    expect(mockedNavigate).toHaveBeenCalledTimes(0);
  });

  it('should redirect in case of redirect pathname in state', async () => {
    const redirectTo = '/fake-redirect/1111/222';
    const store = mockStore(Object.assign(
      initialState,
      {
        service: {redirect: redirectTo},
      },
    ));
    const {result} = renderHook(
      () => useRedirectCheck(),
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

    const value = result.current;
    expect(value).toBe(true);
    expect(mockedNavigate).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(redirectTo);
    expect(store.getActions().length).toBe(1);
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(setRedirect.toString());
  });

});

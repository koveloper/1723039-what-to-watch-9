import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import UserBlock from './user-block';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { AuthStatus } from '../../store/constants';
import { Provider } from 'react-redux';
import { AppRoute } from '../../utils/constants';

describe('Component: UserBlock', () => {
  const mockStore = configureMockStore();
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

  describe('In case of "authStatus: AuthStatus.Authorized"', () => {
    const store = mockStore(Object.assign(initialState, {
      user: {
        authStatus: AuthStatus.Authorized,
      },
    }));

    it('should render correctly on auth status is Authorized', () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <UserBlock />
          </Provider>
        </BrowserRouter>,
      );
      //check markup on screen
      expect(screen.getAllByRole('listitem').length).toBe(2);
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
    it('should redirect to User page', () => {
      const fakeUserPageContent = 'fake-user-page';
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route
                path={AppRoute.User}
                element={<h1>{fakeUserPageContent}</h1>}
              />
              <Route
                path='/'
                element={<UserBlock />}
              />
            </Routes>
          </Provider>
        </BrowserRouter>,
      );
      expect(store.getActions()).toEqual([]);
      //simulate click event for avatar
      userEvent.click(screen.getAllByRole('listitem')[0]);
      //check markup on screen
      expect(screen.getByText(fakeUserPageContent)).toBeInTheDocument();
    });
  });

  it('should render correctly on auth status is UnAuthorized', () => {
    const store = mockStore(Object.assign(initialState, {
      user: {
        authStatus: AuthStatus.UnAuthorized,
      },
    }));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UserBlock />
        </Provider>
      </BrowserRouter>,
    );
    //check markup on screen
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render correctly on auth status is Unknown', () => {
    const store = mockStore(Object.assign(initialState, {
      user: {
        authStatus: AuthStatus.Unknown,
      },
    }));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UserBlock />
        </Provider>
      </BrowserRouter>,
    );
    //check markup on screen
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

});

import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createFakeFilms, createInitialState } from '../../utils/mocks';
import { AuthStatus } from '../../store/constants';
import UserListPage from './user-list-page';

describe('Component: UserListPage', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();
  //check markup only
  it('should render spinner if favorite films not fetched or NO auth', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    {
      const store = mockStore(initialState);
      const {unmount} = render(
        <Provider store={store} >
          <BrowserRouter>
            <UserListPage />
          </BrowserRouter>
        </Provider>
        ,
      );
      //check spinner on screen
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
      unmount();
    }
    {
      HTMLMediaElement.prototype.pause = jest.fn;
      const fakeFilms = createFakeFilms(39);
      const fakeFavors = [fakeFilms[0].id, fakeFilms[11].id, fakeFilms[16].id, fakeFilms[22].id];
      const store = mockStore(Object.assign(
        initialState,
        {
          films: {
            all: fakeFilms,
          },
          user: {
            authStatus: AuthStatus.UnAuthorized,
            favoriteFilmsIdList: fakeFavors,
          },
        },
      ));
      render(
        <Provider store={store} >
          <BrowserRouter>
            <UserListPage />
          </BrowserRouter>
        </Provider>,
      );
      //check spinner on screen
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    }
  });
  //check markup only
  it('should render FilmsList if favorite films fetched and auth is OK', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const fakeFilms = createFakeFilms(39);
    const fakeFavors = [fakeFilms[0].id, fakeFilms[11].id, fakeFilms[16].id, fakeFilms[22].id];
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: fakeFilms,
        },
        user: {
          authStatus: AuthStatus.Authorized,
          favoriteFilmsIdList: fakeFavors,
        },
      },
    ));
    render(
      <Provider store={store} >
        <BrowserRouter>
          <UserListPage muted={false}/>
        </BrowserRouter>
      </Provider>
      ,
    );
    //check that email field on screen
    expect(screen.getAllByRole('article').length).toBe(fakeFavors.length);
    for(const id of fakeFavors) {
      const film = fakeFilms.find((f) => f.id === id);
      expect(film && screen.getByText(film.name)).toBeInTheDocument();
    }
  });
});

import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { AuthStatus } from '../../store/constants';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createFakeFilms } from '../../utils/mocks';
import UserListPage from './user-list-page';

describe('Component: UserListPage', () => {
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
  //check markup only
  it('should render spinner if favorite films not fetched', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const store = mockStore(initialState);
    render(
      <Provider store={store} >
        <UserListPage />
      </Provider>
      ,
    );
    //check that email field on screen
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
  //check markup only
  it('should render FilmsList if favorite films fetched', () => {
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

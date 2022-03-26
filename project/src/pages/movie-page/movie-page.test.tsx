import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { AuthStatus } from '../../store/constants';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createFakeComments, createFakeFilmData, createFakeFilms } from '../../utils/mocks';
import MoviePage from './movie-page';

describe('Component: MoviePage', () => {
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
  it('should render correctly with maximum 4 similar films without AddToList and Review button in auth status Unknown or unauthorized', () => {
    const states = [AuthStatus.UnAuthorized, AuthStatus.Unknown];
    for(const auth of states) {
      HTMLMediaElement.prototype.pause = jest.fn;
      const store = mockStore(Object.assign(
        initialState,
        {
          user: {
            authStatus: auth,
          },
        },
      ));
      const film = createFakeFilmData();
      const comments = createFakeComments(11);
      const similarFilms = createFakeFilms(5);
      const {unmount} = render(
        <Provider store={store} >
          <BrowserRouter>
            <MoviePage film={film} comments={comments} similarFilms={similarFilms} muted={false}/>
          </BrowserRouter>
        </Provider>
        ,
      );
      //check that email field on screen
      expect(screen.getByText(film.name)).toBeInTheDocument();
      // console.log();
      const imgArr = screen.getAllByAltText(film.name) as HTMLImageElement[];
      expect(imgArr.length).toBe(2);
      expect(imgArr[0].src).toBe(film.backgroundImage);
      expect(imgArr[1].src).toBe(film.posterImage);
      expect(screen.getAllByRole('article').length).toBe(similarFilms.length > 4 ? 4 : similarFilms.length);
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.queryByText('My list')).not.toBeInTheDocument();
      expect(screen.queryByText('Add review')).not.toBeInTheDocument();
      unmount();
    }
  });
  //check markup only
  it('should render correctly with all film buttons in authorized mode and similar films less than level', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          authStatus: AuthStatus.Authorized,
        },
      },
    ));
    const film = createFakeFilmData();
    const comments = createFakeComments(11);
    const similarFilms = createFakeFilms(3);

    render(
      <Provider store={store} >
        <BrowserRouter>
          <MoviePage film={film} comments={comments} similarFilms={similarFilms} muted={false}/>
        </BrowserRouter>
      </Provider>
      ,
    );
    expect(screen.getAllByRole('article').length).toBe(similarFilms.length > 4 ? 4 : similarFilms.length);
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});

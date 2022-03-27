import { render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { AuthStatus } from '../../store/constants';
import { Provider } from 'react-redux';
import { createFakeFilmData, createFakeFilmFullData, createInitialState } from '../../utils/mocks';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { AppRoute } from '../../utils/constants';
import MoviePageRouter from './movie-page-router';

describe('Component: MoviePageRouter', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();
  it('should render spinner on NO film data', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const store = mockStore(initialState);
    const film = createFakeFilmData();
    const history:History = createMemoryHistory();
    history.push(`/films/${film.id}`);
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Film} element={<MoviePageRouter/>}/>
            <Route path='*' element={<div>err-404</div>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
      ,
    );
    expect(screen.queryByText('err-404')).not.toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
  it('should render film page on data fetch', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const film = createFakeFilmFullData();
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          fullDataFilms: {
            [film.id]: film,
          },
        },
      },
    ));
    const history:History = createMemoryHistory();
    history.push(`/films/${film.id}`);
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Film} element={<MoviePageRouter muted={false}/>}/>
            <Route path='*' element={<div>err-404</div>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
      ,
    );
    expect(screen.queryByText('err-404')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Please wait...')).not.toBeInTheDocument();
    //check that email field on screen
    expect(screen.getByText(film.data.name)).toBeInTheDocument();
    //check for render film page
    const imgArr = screen.getAllByAltText(film.data.name) as HTMLImageElement[];
    expect(imgArr.length).toBe(2);
    expect(imgArr[0].src).toBe(film.data.backgroundImage);
    expect(imgArr[1].src).toBe(film.data.posterImage);
    expect(screen.getAllByRole('article').length).toBe(film.similar.length > 4 ? 4 : film.similar.length);
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
  it('should render add review page on data fetch and authorized status', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const film = createFakeFilmFullData();
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          authStatus: AuthStatus.Authorized,
        },
        films: {
          fullDataFilms: {
            [film.id]: film,
          },
        },
      },
    ));
    const history:History = createMemoryHistory();
    history.push(`/films/${film.id}/review`);
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Film} element={<MoviePageRouter muted={false}/>}/>
            <Route path='*' element={<div>err-404</div>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
      ,
    );
    expect(screen.queryByText('err-404')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Please wait...')).not.toBeInTheDocument();
    //check poster and background image on screen
    const imgArr = screen.getAllByAltText(film.data.name) as HTMLImageElement[];
    expect(imgArr.length).toBe(2);
    expect(imgArr[0].src).toBe(film.data.backgroundImage);
    expect(imgArr[1].src).toBe(film.data.posterImage);
    //check review textarea on screen
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    //check submit button on screen
    expect(screen.getByRole('button')).toBeInTheDocument();
    //check nav on screen
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

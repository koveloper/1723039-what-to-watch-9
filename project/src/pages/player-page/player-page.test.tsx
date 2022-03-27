import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { createFakeFilms, createInitialState } from '../../utils/mocks';
import { AppRoute } from '../../utils/constants';
import PlayerPage from './player-page';

describe('Component: PlayerPage', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();
  const fakeFilmId = 119;
  it('should render spinner on NO data in store', () => {
    const store = mockStore(initialState);
    const history:History = createMemoryHistory();
    history.push(`${AppRoute.Films}/${fakeFilmId}`);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`${AppRoute.Films}/${fakeFilmId}`} element={<PlayerPage />} />
            <Route path='*' element={<div>404-err-page</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
  it('should render player on data fetch', () => {
    const films = createFakeFilms();
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: films,
        },
      },
    ));
    const history:History = createMemoryHistory();
    history.push(`${AppRoute.PlayerRoot}/${fakeFilmId}`);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Player} element={<PlayerPage />} />
            <Route path='*' element={<div>404-err-page</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
    const film = films.find((f) => f.id === fakeFilmId);
    expect(film && screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(3);
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('player-root')).toBeInTheDocument();
  });
  it('should render 404 page on no such film', () => {
    const films = createFakeFilms();
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: films,
        },
      },
    ));
    const history:History = createMemoryHistory();
    history.push(`${AppRoute.PlayerRoot}/9999`);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Player} element={<PlayerPage />} />
            <Route path='*' element={<div>404-err-page</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
    expect(screen.queryByTestId('video')).not.toBeInTheDocument();
    expect(screen.queryByTestId('player-root')).not.toBeInTheDocument();
  });
});

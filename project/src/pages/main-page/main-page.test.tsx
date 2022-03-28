import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createFakeFilmData, createFakeFilms, createInitialState } from '../../utils/mocks';
import { FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP } from '../../utils/constants';
import MainPage from './main-page';
import userEvent from '@testing-library/user-event';

describe('Component: MainPage', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();
  //   const fakeFilmId = 119;
  it('should render spinner on NO data in store', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
  it('should render main page on data fetch', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const films = createFakeFilms(FILMS_ON_PAGE_INITIAL + (FILMS_ON_PAGE_STEP * 10) + Math.round(FILMS_ON_PAGE_STEP / 2));
    const promoFilm = createFakeFilmData();
    const store = mockStore(Object.assign(
      initialState,
      {
        films: {
          all: films,
          promoFilm,
        },
      },
    ));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage muted={false}/>
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Please wait...')).not.toBeInTheDocument();
    expect(screen.getByTestId('catalog')).toBeInTheDocument();
    expect(screen.getByTestId('genre-list')).toBeInTheDocument();
    expect(screen.getByTestId('films-list')).toBeInTheDocument();
    expect(screen.getByTestId('user-block')).toBeInTheDocument();
    expect(screen.getByTestId('film-card-main')).toBeInTheDocument();
    expect(screen.getByTestId('show-more')).toBeInTheDocument();
    expect(screen.getByTestId('show-more').tagName.toLowerCase()).toBe('button');
    //check for film cards on page with show more button click
    const clicksForShowAllFilms = Math.floor((films.length - FILMS_ON_PAGE_INITIAL) / FILMS_ON_PAGE_STEP);
    for(let i = 0; i < clicksForShowAllFilms; i++) {
      expect(screen.getAllByTestId('film-logo').length).toBe(FILMS_ON_PAGE_INITIAL + (FILMS_ON_PAGE_STEP * i));
      userEvent.click(screen.getByTestId('show-more'));
    }
    //make last click for display all films
    userEvent.click(screen.getByTestId('show-more'));
    expect(screen.getAllByTestId('film-logo').length).toBe(films.length);
    //check show button hided
    expect(screen.queryByTestId('show-more')).not.toBeInTheDocument();
  });
});

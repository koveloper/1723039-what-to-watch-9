import { render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { AuthStatus } from '../../store/constants';
import { Provider } from 'react-redux';
import { createFakeFilmData } from '../../utils/mocks';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { setRedirect } from '../../store/service-process/service-process';
import { AppRoute } from '../../utils/constants';
import AddReviewPage from './add-review-page';
import userEvent from '@testing-library/user-event';

describe('Component: AddReviewPage', () => {
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
  it('should redirect to sign in page on unknown or unauthorized auth status', () => {
    const states = [AuthStatus.UnAuthorized, AuthStatus.Unknown];
    for(const auth of states) {
      const store = mockStore(Object.assign(
        initialState,
        {
          user: {
            authStatus: auth,
          },
        },
      ));
      const film = createFakeFilmData();
      const {unmount} = render(
        <Provider store={store} >
          <AddReviewPage
            id={film.id}
            name={film.name}
            backgroundImage={film.backgroundImage}
            posterImage={film.posterImage}
          />
        </Provider>
        ,
      );
      //check actions in queue after hook invoke
      expect(store.getActions().length).toBe(1);
      const redirectAction = store.getActions().find(({type}) => type === setRedirect.toString());
      expect(redirectAction).not.toBe(undefined);
      //check action payload
      expect(redirectAction && ('payload' in redirectAction) && redirectAction['payload']).toBe(AppRoute.SignIn);
      unmount();
    }
  });
  it('should render page on authorized auth status and redirect to film page on breadcumbs click', () => {
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          authStatus: AuthStatus.Authorized,
        },
      },
    ));
    const film = createFakeFilmData();
    const history:History = createMemoryHistory();
    history.push(`/films/${film.id}/review`);
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`/films/${film.id}/review`} element={
              <AddReviewPage
                id={film.id}
                name={film.name}
                backgroundImage={film.backgroundImage}
                posterImage={film.posterImage}
              />
            }
            />
            <Route path={`/films/${film.id}`} element={<div>film-fake-page</div>}/>
            <Route path='*' element={<div>err404</div>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
      ,
    );
    //check poster and background image on screen
    const imgArr = screen.getAllByAltText(film.name) as HTMLImageElement[];
    expect(imgArr.length).toBe(2);
    expect(imgArr[0].src).toBe(film.backgroundImage);
    expect(imgArr[1].src).toBe(film.posterImage);
    //check review textarea on screen
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    //check submit button on screen
    expect(screen.getByRole('button')).toBeInTheDocument();
    //check nav on screen
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    //check a.href to film on page
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(film.name).tagName.toLowerCase()).toBe('a');
    //simulate click on breadcumb
    userEvent.click(screen.getByText(film.name));
    //check redirect to film page done
    expect(screen.getByText('film-fake-page')).toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import FilmCardButtons from './film-card-buttons';
import { ButtonType } from './constants';

describe('Component: SvgButton', () => {

  describe('should render correctly', () => {
    it('2 buttons and link', () => {
      render(
        <BrowserRouter>
          <FilmCardButtons isFavorite isShowAddToFavorsButton isShowAddReviewButton onButtonClick={() => void 0}/>
        </BrowserRouter>,
      );
      //check buttons count
      expect(screen.getAllByRole('button').length).toBe(2);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
    it('2 buttons WITHOUT link', () => {
      render(
        <BrowserRouter>
          <FilmCardButtons isFavorite isShowAddToFavorsButton isShowAddReviewButton={false} onButtonClick={() => void 0}/>
        </BrowserRouter>,
      );
      //check buttons count
      expect(screen.getAllByRole('button').length).toBe(2);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
    it('only one button', () => {
      render(
        <BrowserRouter>
          <FilmCardButtons isFavorite isShowAddToFavorsButton={false} isShowAddReviewButton={false} onButtonClick={() => void 0}/>
        </BrowserRouter>,
      );
      //check buttons count
      expect(screen.getAllByRole('button').length).toBe(1);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('should invoke callback', () => {
    const history:History = createMemoryHistory();
    beforeEach(() => {
      history.push('/fake-page');
    });
    it('Play button click check', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`/${ButtonType.Play}`}
              element={<h1>This is Play page</h1>}
            />
            <Route
              path={`/${ButtonType.MyList}`}
              element={<h1>This is MyList page</h1>}
            />
            <Route
              path={`/${ButtonType.AddReview}`}
              element={<h1>This is AddReview page</h1>}
            />
            <Route
              path="*"
              element={<FilmCardButtons isFavorite isShowAddToFavorsButton isShowAddReviewButton onButtonClick={(btnType) => history.push(`/${btnType}`)}/>}
            />
          </Routes>
        </HistoryRouter>,
      );
      //check for buttons on screen
      expect(screen.queryByText(/This is Play page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is MyList page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is AddReview page/i)).not.toBeInTheDocument();
      //
      userEvent.click(screen.getAllByRole('button')[0]);
      expect(screen.getByText(/This is Play page/i)).toBeInTheDocument();
    });
    it('MyList button click check', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`/${ButtonType.Play}`}
              element={<h1>This is Play page</h1>}
            />
            <Route
              path={`/${ButtonType.MyList}`}
              element={<h1>This is MyList page</h1>}
            />
            <Route
              path={`/${ButtonType.AddReview}`}
              element={<h1>This is AddReview page</h1>}
            />
            <Route
              path="*"
              element={<FilmCardButtons isFavorite isShowAddToFavorsButton isShowAddReviewButton onButtonClick={(btnType) => history.push(`/${btnType}`)}/>}
            />
          </Routes>
        </HistoryRouter>,
      );
      //check for buttons on screen
      expect(screen.queryByText(/This is Play page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is MyList page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is AddReview page/i)).not.toBeInTheDocument();
      //
      userEvent.click(screen.getAllByRole('button')[1]);
      expect(screen.getByText(/This is MyList page/i)).toBeInTheDocument();
    });
    it('AddReview button click check', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`/${ButtonType.Play}`}
              element={<h1>This is Play page</h1>}
            />
            <Route
              path={`/${ButtonType.MyList}`}
              element={<h1>This is MyList page</h1>}
            />
            <Route
              path={`/${ButtonType.AddReview}`}
              element={<h1>This is AddReview page</h1>}
            />
            <Route
              path="*"
              element={<FilmCardButtons isFavorite isShowAddToFavorsButton isShowAddReviewButton onButtonClick={(btnType) => history.push(`/${btnType}`)}/>}
            />
          </Routes>
        </HistoryRouter>,
      );
      //check for buttons on screen
      expect(screen.queryByText(/This is Play page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is MyList page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is AddReview page/i)).not.toBeInTheDocument();
      //
      userEvent.click(screen.getAllByRole('link')[0]);
      expect(screen.getByText(/This is AddReview page/i)).toBeInTheDocument();
    });
  });
});

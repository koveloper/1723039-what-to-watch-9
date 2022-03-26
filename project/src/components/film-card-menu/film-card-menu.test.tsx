import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import FilmCardMenu from './film-card-menu';
import { FilmInfoType } from '../../utils/constants';

describe('Component: FilmCardMenu', () => {

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <FilmCardMenu onTabSelect={() => void 0}/>
      </BrowserRouter>,
    );
    //check that links count is equal to genres count
    expect(screen.getAllByRole('link').length).toBe(3);
    //check all genres names on screen
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  describe('test for menu tabs selection', () => {
    const history:History = createMemoryHistory();
    beforeEach(() => {
      history.push('/fake-page');
    });
    it('should redirect to Overview tab', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`/${FilmInfoType.Overview}`}
              element={<h1>This is overview page</h1>}
            />
            <Route
              path={`/${FilmInfoType.Details}`}
              element={<h1>This is details page</h1>}
            />
            <Route
              path={`/${FilmInfoType.Reviews}`}
              element={<h1>This is reviews page</h1>}
            />
            <Route
              path="*"
              element={<FilmCardMenu onTabSelect={(tab) => history.push(`/${tab}`)}/>}
            />
          </Routes>
        </HistoryRouter>,
      );
      //check for menu on screen
      expect(screen.queryByText(/This is overview page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is details page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is reviews page/i)).not.toBeInTheDocument();
      //
      userEvent.click(screen.getAllByRole('link')[0]);
      expect(screen.getByText(/This is overview page/i)).toBeInTheDocument();
    });
    it('should redirect to Details tab', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`/${FilmInfoType.Overview}`}
              element={<h1>This is overview page</h1>}
            />
            <Route
              path={`/${FilmInfoType.Details}`}
              element={<h1>This is details page</h1>}
            />
            <Route
              path={`/${FilmInfoType.Reviews}`}
              element={<h1>This is reviews page</h1>}
            />
            <Route
              path="*"
              element={<FilmCardMenu onTabSelect={(tab) => history.push(`/${tab}`)}/>}
            />
          </Routes>
        </HistoryRouter>,
      );
      //check for menu on screen
      expect(screen.queryByText(/This is overview page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is details page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is reviews page/i)).not.toBeInTheDocument();
      //
      userEvent.click(screen.getAllByRole('link')[1]);
      expect(screen.getByText(/This is details page/i)).toBeInTheDocument();
    });
    it('should redirect to Reviews tab', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`/${FilmInfoType.Overview}`}
              element={<h1>This is overview page</h1>}
            />
            <Route
              path={`/${FilmInfoType.Details}`}
              element={<h1>This is details page</h1>}
            />
            <Route
              path={`/${FilmInfoType.Reviews}`}
              element={<h1>This is reviews page</h1>}
            />
            <Route
              path="*"
              element={<FilmCardMenu onTabSelect={(tab) => history.push(`/${tab}`)}/>}
            />
          </Routes>
        </HistoryRouter>,
      );
      //check for menu on screen
      expect(screen.queryByText(/This is overview page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is details page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/This is reviews page/i)).not.toBeInTheDocument();
      //
      userEvent.click(screen.getAllByRole('link')[2]);
      expect(screen.getByText(/This is reviews page/i)).toBeInTheDocument();
    });
  });
});

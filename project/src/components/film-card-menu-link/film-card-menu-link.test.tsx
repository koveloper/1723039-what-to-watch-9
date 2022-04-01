import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import FilmCardMenuLink from './film-card-menu-link';

describe('Component: MenuLink', () => {

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <FilmCardMenuLink isActive onClick={() => void 0}>
            Fake menu link
        </FilmCardMenuLink>
      </BrowserRouter>,
    );
    //check that links count is equal to genres count
    expect(screen.getByRole('link')).toBeInTheDocument();
    //check all genres names on screen
    expect(screen.getByText('Fake menu link')).toBeInTheDocument();
  });

  it('should call onClick callback', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    const fakeUri = '/film-card-menu-link-test';
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={fakeUri}
            element={<h1>This is fake page</h1>}
          />
          <Route
            path="*"
            element={<FilmCardMenuLink isActive onClick={() => history.push(fakeUri)} />}
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for redirect to fake page on click
    expect(screen.queryByText(/This is fake page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is fake page/i)).toBeInTheDocument();
  });
});

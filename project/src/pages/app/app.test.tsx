import {render, screen} from '@testing-library/react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { AppRoute } from '../../utils/constants';

describe('Component: App', () => {

  it('should handle root route correctly', () => {
    const history:History = createMemoryHistory();
    // history.push('/fake-page');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Root} element={<div>main-page</div>} />
          <Route path="*" element={<div>404-page</div>} />
        </Routes>
      </HistoryRouter>,
    );
    expect(screen.getByText(/main-page/i)).toBeInTheDocument();
  });
  it('should handle sign-in route correctly', () => {
    const history:History = createMemoryHistory();
    history.push(AppRoute.SignIn);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.SignIn} element={<div>sign-in-page</div>} />
          <Route path="*" element={<div>404-page</div>} />
        </Routes>
      </HistoryRouter>,
    );
    expect(screen.getByText(/sign-in-page/i)).toBeInTheDocument();
  });
  it('should handle user route correctly', () => {
    const history:History = createMemoryHistory();
    history.push(AppRoute.User);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.User} element={<div>user-page</div>} />
          <Route path="*" element={<div>404-page</div>} />
        </Routes>
      </HistoryRouter>,
    );
    expect(screen.getByText(/user-page/i)).toBeInTheDocument();
  });
  it('should handle film route correctly', () => {
    const history:History = createMemoryHistory();
    history.push(`${AppRoute.Films  }/33`);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Film} element={<div>film-page</div>} />
          <Route path="*" element={<div>404-page</div>} />
        </Routes>
      </HistoryRouter>,
    );
    expect(screen.getByText(/film-page/i)).toBeInTheDocument();
  });
  it('should handle other routes to 404 page', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Root} element={<div>main-page</div>} />
          <Route path={AppRoute.SignIn} element={<div>sign-in-page</div>} />
          <Route path={AppRoute.User} element={<div>user-page</div>} />
          <Route path={AppRoute.Film} element={<div>film-page</div>} />
          <Route path={AppRoute.Player} element={<div>player-page</div>} />
          <Route path="*" element={<div>404-page</div>} />
        </Routes>
      </HistoryRouter>,
    );
    expect(screen.getByText(/404-page/i)).toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Logo from './logo';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, History } from 'history';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Logo isLight/>
      </BrowserRouter>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<Logo isLight/>}
          />
        </Routes>
      </HistoryRouter>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});

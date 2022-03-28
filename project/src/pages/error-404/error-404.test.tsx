import userEvent from '@testing-library/user-event';
import Error404 from './error-404';
import {render, screen} from '@testing-library/react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { AppRoute } from '../../utils/constants';

describe('Component: Error404', () => {

  it('should render correctly', () => {
    const history:History = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </HistoryRouter>,
    );
    //check logo link on page
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
    //check component with text on page
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
  it('should redirect to main page on top link click', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-path');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Root} element={<div>main-page</div>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </HistoryRouter>,
    );
    const links = screen.getAllByRole('link');
    //simulate link click event
    userEvent.click(links[0]);
    //check for main page on screen
    expect(screen.getByText('main-page')).toBeInTheDocument();
  });
});

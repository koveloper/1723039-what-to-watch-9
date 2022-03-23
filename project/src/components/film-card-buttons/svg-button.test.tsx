import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import SvgButton from './svg-button';

describe('Component: SvgButton', () => {
  const fakeTitle = 'fake-button-title';
  const fakeChildren = 'fake-button-children';

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <SvgButton title={fakeTitle} onClick={() => void 0}>
          {fakeChildren}
        </SvgButton>
      </BrowserRouter>,
    );
    //check that links count is equal to genres count
    expect(screen.getByRole('button')).toBeInTheDocument();
    //check all genres names on screen
    expect(screen.getByText(fakeTitle)).toBeInTheDocument();
    expect(screen.getByText(fakeChildren)).toBeInTheDocument();
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
            element={<SvgButton title={fakeTitle} onClick={() => history.push(fakeUri)} />}
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for redirect to fake page on click
    expect(screen.queryByText(/This is fake page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/This is fake page/i)).toBeInTheDocument();
  });
});

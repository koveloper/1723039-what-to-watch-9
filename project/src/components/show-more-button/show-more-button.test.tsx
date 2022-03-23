import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <ShowMoreButton onClick={() => void 0} />
      </BrowserRouter>,
    );
    //check that links count is equal to genres count
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should invoke callback onClick', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    const buttonTestUri = '/button-click-test';
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={buttonTestUri}
            element={<h1>This is button click test page</h1>}
          />
          <Route
            path="*"
            element={<ShowMoreButton onClick={() => history.push(buttonTestUri)} />}
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for button click supported  - onClick fires and redirect will be done
    expect(screen.queryByText(/This is button click test page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/This is button click test page/i)).toBeInTheDocument();
  });
});

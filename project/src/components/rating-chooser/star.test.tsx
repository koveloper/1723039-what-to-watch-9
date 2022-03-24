import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import Star from './star';

describe('Component: Star', () => {

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Star checked value={7} onClickCallback={() => void 0}></Star>
      </BrowserRouter>,
    );
    //check that links count is equal to genres count
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should invoke onClickCallback with its number by user click', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    const fakeNumber = 9;
    const createUri = (num: number) => `/fake-star-${num}-link`;
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={createUri(fakeNumber)}
            element={<h1>This is star test page</h1>}
          />
          <Route
            path="*"
            element={
              <Star checked={false} value={fakeNumber} onClickCallback={(num) => history.push(createUri(num))}/>
            }
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for redirect to fake page on click
    expect(screen.queryByText(/This is star test page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(`Rating ${fakeNumber.toString()}`));
    expect(screen.getByText(/This is star test page/i)).toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import RatingChooser from './rating-chooser';

describe('Component: RatingChooser', () => {

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <RatingChooser onRatingChange={() => void 0} rating={7}/>
      </BrowserRouter>,
    );
    //check that links count is equal to genres count
    expect(screen.getAllByRole('radio').length).toBe(10);
  });

  it('should invoke onRatingChange with its number by user click on any radio input', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    const fakeNumber = Math.floor(Math.random() * 10) + 1;
    const createUri = (num: number) => `/fake-rate-${num}-page`;
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={createUri(fakeNumber)}
            element={<h1>This is rating test page</h1>}
          />
          <Route
            path="*"
            element={
              <RatingChooser onRatingChange={(num) => history.push(createUri(num))} rating={0}/>
            }
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for redirect to fake page on click
    expect(screen.queryByText(/This is rating test page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(`Rating ${fakeNumber.toString()}`));
    expect(screen.getByText(/This is rating test page/i)).toBeInTheDocument();
  });
});

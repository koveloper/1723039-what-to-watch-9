import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import GenresListItem from './genres-list-item';

describe('Component: GenreListItem', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <GenresListItem selected title='Fake-Genre' onSelect={() => void 0}/>
      </BrowserRouter>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Fake-Genre')).toBeInTheDocument();
  });

  it('should redirect to test page url when user clicked to genre link', () => {
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    const fakeGenreUri = '/fake-genre';
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={fakeGenreUri}
            element={<h1>This is fake genre page</h1>}
          />
          <Route
            path="*"
            element={<GenresListItem selected title='Fake-Genre' onSelect={() => history.push(fakeGenreUri)}/>}
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for link click supported - onSelect fires and test redirect will be done
    expect(screen.queryByText(/This is fake genre page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is fake genre page/i)).toBeInTheDocument();
  });
});

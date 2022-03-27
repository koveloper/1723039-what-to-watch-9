import {render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import userEvent from '@testing-library/user-event';
import GenresList from './genres-list';
import { createFakeGenres } from '../../utils/mocks';
import { MAX_GENRES_ON_SCREEN } from '../../utils/constants';

describe('Component: GenreList', () => {

  it('should render correctly with maximum 10 genres', () => {
    for(const count of [8, 15]) {
      const genres = createFakeGenres(count);
      const {unmount} = render(
        <BrowserRouter>
          <GenresList currentGenre={genres[0]} genres={genres} onGenreChange={() => void 0}/>
        </BrowserRouter>,
      );
      //check that links count is equal to genres count
      expect(screen.getAllByRole('link').length).toEqual(genres.slice(0, MAX_GENRES_ON_SCREEN).length);
      //check all genres names on screen
      for(const g of genres.slice(0, MAX_GENRES_ON_SCREEN)) {
        expect(screen.getByText(g)).toBeInTheDocument();
      }
      unmount();
    }
  });

  it('should return genre title on any genre click', () => {
    const genres = createFakeGenres();
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    const genreIndex = 3;
    const fakeGenreUri = `/${genres[genreIndex]}`;
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={fakeGenreUri}
            element={<h1>This is fake genre page</h1>}
          />
          <Route
            path="*"
            element={<GenresList currentGenre={genres[genres.length - 1]} genres={genres} onGenreChange={(genre) => history.push(`/${genre}`)}/>}
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for link click supported  - onSelect fires, genre value returned
    // and test redirect will be done
    expect(screen.queryByText(/This is fake genre page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getAllByRole('link')[genreIndex]);
    expect(screen.getByText(/This is fake genre page/i)).toBeInTheDocument();
  });
});

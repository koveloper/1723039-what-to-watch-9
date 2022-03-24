import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createFakeFilms } from '../../utils/mocks';
import FilmsList from './films-list';

describe('Component: GenreList', () => {
  const filmsCount = 43;
  const films = createFakeFilms(filmsCount);

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <FilmsList films={films}/>
      </BrowserRouter>,
    );
    //check that links count is equal to films count
    expect(screen.getAllByRole('link').length).toEqual(filmsCount);
  });
});

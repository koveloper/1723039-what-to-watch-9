import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createFakeFilms } from '../../utils/mocks';
import FilmsList from './films-list';

describe('Component: FilmsList', () => {
  const filmsCount = 43;
  const films = createFakeFilms(filmsCount);
  it('should render correctly', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    render(
      <BrowserRouter>
        <FilmsList films={films} muted={false}/>
      </BrowserRouter>,
    );
    //check that links count is equal to films count
    expect(screen.getAllByRole('link').length).toEqual(filmsCount);
    for(const film of films) {
      expect(screen.getAllByText(film.name).length > 0).toBe(true);
    }
  });
});

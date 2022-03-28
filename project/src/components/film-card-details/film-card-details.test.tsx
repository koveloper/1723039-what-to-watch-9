import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createFakeFilmData } from '../../utils/mocks';
import FilmCardDetails from './film-card-details';

describe('Component: FilmCardDetails', () => {

  it('should render correctly', () => {
    const fakeFilm = createFakeFilmData();
    render(
      <BrowserRouter>
        <FilmCardDetails
          film={fakeFilm}
        />
      </BrowserRouter>,
    );
    //check all text values on screen
    expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import { createFakeFilmData } from '../../utils/mocks';
import FilmCardOverview from './film-card-overview';

describe('Component: FilmCardOverview', () => {
  const film = createFakeFilmData();
  it('should render correctly', () => {
    render(
      <FilmCardOverview
        film={film}
      />,
    );
    //check some values on screen
    expect(screen.getByText(film.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${film.director}`)).toBeInTheDocument();
  });
});

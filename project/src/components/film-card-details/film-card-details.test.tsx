import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createFakeNames } from '../../utils/mocks';
import FilmCardDetails from './film-card-details';

describe('Component: FilmCardDetails', () => {

  it('should render correctly', () => {
    const fakeDirector = 'fake-director';
    const fakeGenre = 'fake-genre';
    const fakeReleased = 1976;
    const fakeRunTime = 137;
    const fakeStarring = createFakeNames(11);
    render(
      <BrowserRouter>
        <FilmCardDetails
          director={fakeDirector}
          genre={fakeGenre}
          released={fakeReleased}
          runTime={fakeRunTime}
          starring={fakeStarring}
        />
      </BrowserRouter>,
    );
    //check all text values on screen
    expect(screen.getByText(fakeDirector)).toBeInTheDocument();
    expect(screen.getByText(fakeGenre)).toBeInTheDocument();
    expect(screen.getByText(fakeReleased)).toBeInTheDocument();
  });
});

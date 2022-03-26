import {render, screen} from '@testing-library/react';
import { createFakeName, createFakeNames, createFakeParagraph } from '../../utils/mocks';
import FilmCardOverview from './film-card-overview';

describe('Component: FilmCardOverview', () => {
  const description = createFakeParagraph();
  const director = createFakeName();
  const starring = createFakeNames();
  it('should render correctly', () => {
    render(
      <FilmCardOverview
        description={description}
        director={director}
        rating={7}
        scoresCount={9122}
        starring={starring}
      />,
    );
    //check some values on screen
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${  director}`)).toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FilmCardMain from './film-card-main';

describe('Component: FilmCardMain', () => {

  it('should render correctly', () => {
    const fakeTitle = 'fake-title';
    const fakeGenre = 'fake-genre';
    const fakeReleaseYear = 1999;
    const fakeChildren = 'fake-children';
    render(
      <BrowserRouter>
        <FilmCardMain title={fakeTitle} genre={fakeGenre} releaseYear={fakeReleaseYear}>
          {fakeChildren}
        </FilmCardMain>
      </BrowserRouter>,
    );
    //check all genres names on screen
    expect(screen.getByText(fakeTitle)).toBeInTheDocument();
    expect(screen.getByText(fakeGenre)).toBeInTheDocument();
    expect(screen.getByText(fakeReleaseYear)).toBeInTheDocument();
    expect(screen.getByText(fakeChildren)).toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import { PosterSize } from '../../utils/constants';
import { createFakeUrl } from '../../utils/mocks';
import FilmCardPoster from './film-card-poster';

describe('Component: FilmCardPoster', () => {
  const fakeUrl = createFakeUrl();
  it('should render correctly', () => {
    render(
      <FilmCardPoster posterUrl={fakeUrl} size={PosterSize.Big} title='fake-poster'/>,
    );
    //check all genres names on screenц
    expect(screen.getByAltText('fake-poster')).toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createFakeComments } from '../../utils/mocks';
import FilmCardReviews from './film-card-reviews';

describe('Component: FilmCardReviews', () => {
  const fakeComments = createFakeComments();

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <FilmCardReviews comments={fakeComments}/>
      </BrowserRouter>,
    );
    //check for all comments on page
    for(const comment of fakeComments) {
      expect(screen.getByText(comment.comment)).toBeInTheDocument();
      expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    }
  });
});

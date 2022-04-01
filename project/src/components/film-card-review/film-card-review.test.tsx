import {render, screen} from '@testing-library/react';
import { createFakeComment } from '../../utils/mocks';
import FilmCardReview from './film-card-review';

describe('Component: Review', () => {
  const fakeComment = createFakeComment();

  it('should render correctly', () => {
    render(
      <FilmCardReview {...fakeComment}/>,
    );
    //check all genres names on screen
    expect(screen.getByText(fakeComment.rating)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
  });
});

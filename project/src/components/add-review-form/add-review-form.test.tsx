import userEvent from '@testing-library/user-event';
import AddReviewForm from './add-review-form';
import {render, screen} from '@testing-library/react';
import { createFakeParagraph } from '../../utils/mocks';

describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    render(
      <AddReviewForm onReviewSubmit={() => void 0}/>,
    );
    //check that links count is equal to genres count
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(10);
  });

  it('should fire onReviewSubmit with review text on film rating', () => {
    const fakeReview = createFakeParagraph();
    const fakeRatingNum = 3;
    render(
      <>
        <div id="context-snapshot">---</div>
        <AddReviewForm onReviewSubmit={(rating: number, commentary: string) => {
          const snapshot = screen.getByText('---');
          if(snapshot) {
            snapshot.textContent = `${commentary} with mark ${rating}`;
          }
        }}
        />
      </>,
    );
    //test for redirect to fake page on click
    expect(screen.getByText(/---/i)).toBeInTheDocument();
    //change review text and simulate rating chooser click
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.value = fakeReview;
    userEvent.click(screen.getByText(`Rating ${fakeRatingNum.toString()}`));
    //fire add review click and check it's values
    userEvent.click(screen.getByRole('button'));
    //check screen results
    expect(screen.queryByText(/---/i)).not.toBeInTheDocument();
    expect(screen.getByText(`${fakeReview} with mark ${fakeRatingNum}`)).toBeInTheDocument();
  });
});

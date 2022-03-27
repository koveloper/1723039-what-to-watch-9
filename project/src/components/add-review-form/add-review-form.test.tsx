import userEvent from '@testing-library/user-event';
import AddReviewForm from './add-review-form';
import { render, screen} from '@testing-library/react';
import { createFakeParagraph } from '../../utils/mocks';
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from '../../utils/constants';

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

  it('should set post button to disabled state in case of review text size outside bounds [50, 400]', () => {
    render(
      <AddReviewForm onReviewSubmit={(rating: number, commentary: string) => {
        const snapshot = screen.getByText('---');
        if(snapshot) {
          snapshot.textContent = `${commentary} with mark ${rating}`;
        }
      }}
      />,
    );
    //simulate user rating choise
    userEvent.click(screen.getByText('Rating 3'));

    //outside threshold: < min
    userEvent.type(screen.getByRole('textbox'), new Array(MIN_REVIEW_LENGTH - 1).fill('a').join(''));
    //check that submit button disabled for text size less than min threshold
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);

    //inside thresholds: min
    userEvent.type(screen.getByRole('textbox'), 'a');
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);
    //inside thresholds: max
    userEvent.type(screen.getByRole('textbox'), new Array((MAX_REVIEW_LENGTH - MIN_REVIEW_LENGTH)).fill('a').join(''));
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);

    //outside threshold: > max
    userEvent.type(screen.getByRole('textbox'), 'a');
    //check that submit button disabled for text size greater than max threshold
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('should set post button to disabled state in case of NO user rating choise DONE', () => {
    render(
      <AddReviewForm onReviewSubmit={(rating: number, commentary: string) => {
        const snapshot = screen.getByText('---');
        if(snapshot) {
          snapshot.textContent = `${commentary} with mark ${rating}`;
        }
      }}
      />,
    );
    //simulate input of text with size in threshold
    userEvent.type(screen.getByRole('textbox'), new Array(MIN_REVIEW_LENGTH + 1).fill('a').join(''));
    //check that submit button disabled without user rating choise
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });
  it('should fire onReviewSubmit with review text on film rating', () => {
    let fakeReview = createFakeParagraph();
    while(fakeReview.length < MIN_REVIEW_LENGTH) {
      fakeReview += '.';
    }
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
    userEvent.type(screen.getByRole('textbox'), fakeReview);
    userEvent.click(screen.getByText(`Rating ${fakeRatingNum.toString()}`));
    //fire add review click and check it's values
    userEvent.click(screen.getByRole('button'));
    //check screen results
    expect(screen.queryByText(/---/i)).not.toBeInTheDocument();
    expect(screen.getByText(`${fakeReview} with mark ${fakeRatingNum}`)).toBeInTheDocument();
  });
});

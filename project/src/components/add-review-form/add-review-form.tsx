import { SyntheticEvent, useRef, useState } from 'react';
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from '../../utils/constants';
import RatingChooser from '../rating-chooser/rating-chooser';

type AddReviewFormProps = {
  onReviewSubmit: (rating: number, commentary: string) => void;
}

function AddReviewForm(props: AddReviewFormProps): JSX.Element {
  const [rating, setRating] = useState<number>(-1);
  const [isPostEnabled, setPostEnabled] = useState(false);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const review = reviewRef.current;
  const handleSumbmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if(!review) {
      return;
    }
    props.onReviewSubmit(rating, review.value);
  };
  const handleReviewInput = (evt: SyntheticEvent) => {
    const el = evt.target as HTMLTextAreaElement;
    setPostEnabled(el.value.length >= MIN_REVIEW_LENGTH && el.value.length <= MAX_REVIEW_LENGTH);
  };
  const handleRatingChange = (userRate: number) => {
    setRating(userRate);
  };
  return (
    <div className="add-review">
      <form onSubmit={handleSumbmit} action="#" className="add-review__form">
        <RatingChooser rating={rating} onRatingChange={handleRatingChange}/>
        <div className="add-review__text">
          <textarea
            ref={reviewRef}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onInput={handleReviewInput}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!isPostEnabled || (rating <= 0)}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;

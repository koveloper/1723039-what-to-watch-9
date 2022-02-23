import { useState } from 'react';
import RatingChooser from './rating-chooser';

function AddReviewForm(): JSX.Element {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <RatingChooser rating={rating} onRatingChange={(userRate: number) => {setRating(userRate);}}/>
        <div className="add-review__text">
          <textarea
            onChange={(evt) => {
              setReview(evt.target.value || '');
            }}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={review}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;

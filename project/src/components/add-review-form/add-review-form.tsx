import { SyntheticEvent, useRef, useState } from 'react';
import RatingChooser from '../rating-chooser/rating-chooser';

type AddReviewFormProps = {
  onReviewSubmit: (rating: number, commentary: string) => void;
}

export default function AddReviewForm(props: AddReviewFormProps): JSX.Element {
  const [rating, setRating] = useState(5);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const onSubmitHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if(!reviewRef.current) {
      return;
    }
    props.onReviewSubmit(rating, reviewRef.current.value);
  };
  return (
    <div className="add-review">
      <form onSubmit={onSubmitHandler} action="#" className="add-review__form">
        <RatingChooser rating={rating} onRatingChange={(userRate: number) => {setRating(userRate);}}/>
        <div className="add-review__text">
          <textarea
            ref={reviewRef}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

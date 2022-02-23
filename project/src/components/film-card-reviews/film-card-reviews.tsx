import { FilmReviewType } from '../../types/film-review-type';
import Review from './review';

type FilmCardReviewsProps = {
  reviews: FilmReviewType[];
}

function FilmCardReviews({reviews}: FilmCardReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.filter((r, index) => (index % 2) === 0).map((review) => Review(review))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.filter((r, index) => (index % 2) === 1).map((review) => Review(review))}
      </div>
    </div>
  );
}

export default FilmCardReviews;

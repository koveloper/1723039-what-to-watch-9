import { FilmReviewProps } from '../../types/film-reviews-type';
import FilmCardReview from '../film-card-review/film-card-review';

function FilmCardReviewsList({reviews}: {reviews: FilmReviewProps[]}): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.filter((r, index) => (index % 2) === 0).map((review) => FilmCardReview(review))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.filter((r, index) => (index % 2) === 1).map((review) => FilmCardReview(review))}
      </div>
    </div>
  );
}

export default FilmCardReviewsList;

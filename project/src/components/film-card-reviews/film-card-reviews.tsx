import { Comments } from '../../types/commentary';
import Review from './review';

type FilmCardReviewsProps = {
  comments: Comments;
}

function FilmCardReviews({comments}: FilmCardReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.filter((r, index) => (index % 2) === 0).map((review) => Review(review))}
      </div>
      <div className="film-card__reviews-col">
        {comments.filter((r, index) => (index % 2) === 1).map((review) => Review(review))}
      </div>
    </div>
  );
}

export default FilmCardReviews;

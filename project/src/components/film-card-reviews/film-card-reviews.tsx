import { Comments } from '../../types/commentary';
import FilmCardReview from '../film-card-review/film-card-review';

type FilmCardReviewsProps = {
  comments: Comments;
}

function FilmCardReviews({comments}: FilmCardReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.filter((r, index) => (index % 2) === 0).map((review, i) => <FilmCardReview key={`col-1-${i.toString()}`} {...review}/>)}
      </div>
      <div className="film-card__reviews-col">
        {comments.filter((r, index) => (index % 2) === 1).map((review, i) => <FilmCardReview key={`col-2-${i.toString()}`} {...review}/>)}
      </div>
    </div>
  );
}

export default FilmCardReviews;

import { useGenerateKeys } from '../../hooks/use-generate-keys';
import { Comments } from '../../types/commentary';
import FilmCardReview from '../film-card-review/film-card-review';

type FilmCardReviewsProps = {
  comments: Comments;
}

function FilmCardReviews({comments}: FilmCardReviewsProps): JSX.Element {
  const reviewsKeys = useGenerateKeys('review', comments.length);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((review, index) => (
          (index % 2) === 0
            ? <FilmCardReview key={reviewsKeys[index]} {...review}/>
            : null
        ))}
      </div>
      <div className="film-card__reviews-col">
        {comments.map((review, index) => (
          (index % 2) === 1
            ? <FilmCardReview key={reviewsKeys[index]} {...review}/>
            : null
        ))}
      </div>
    </div>
  );
}

export default FilmCardReviews;

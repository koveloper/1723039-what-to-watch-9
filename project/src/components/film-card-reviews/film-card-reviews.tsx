import dayjs from 'dayjs';
import { FilmReviewProps } from '../../types/film-reviews-type';

const getStringFromDate = (date: Date, forAttribute: boolean) => {
  const format = forAttribute ? 'YYYY-MM-DD' : 'MMMM DD, YYYY';
  return dayjs(date).format(format);
};

function Review(props: FilmReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.content}</p>

        <footer className="review__details">
          <cite className="review__author">{props.reviewerName}</cite>
          <time className="review__date" dateTime={getStringFromDate(props.date, true)}>{getStringFromDate(props.date, false)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{props.raiting}</div>
    </div>
  );
}

function FilmCardReviews({reviews}: {reviews: FilmReviewProps[]}): JSX.Element {
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

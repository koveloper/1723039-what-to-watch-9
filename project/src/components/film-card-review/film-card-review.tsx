import dayjs from 'dayjs';
import { FilmReviewProps } from '../../types/film-reviews-type';

const getStringFromDate = (date: Date, forAttribute: boolean) => {
  const format = forAttribute ? 'YYYY-MM-DD' : 'MMMM DD, YYYY';
  return dayjs(date).format(format);
};

function FilmCardReview(props: FilmReviewProps): JSX.Element {
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

export default FilmCardReview;

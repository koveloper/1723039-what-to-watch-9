import dayjs from 'dayjs';
import { FilmReviewProps } from '../../types/film-reviews-type';

enum DateFormat {
    forAttr = 'YYYY-MM-DD',
    forOut = 'MMMM DD, YYYY'
}

function Review(props: FilmReviewProps): JSX.Element {
  const attrDate = dayjs(props.date).format(DateFormat.forAttr);
  const displayDate = dayjs(props.date).format(DateFormat.forOut);
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.content}</p>
        <footer className="review__details">
          <cite className="review__author">{props.reviewerName}</cite>
          <time className="review__date" dateTime={attrDate}>{displayDate}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{props.raiting}</div>
    </div>
  );
}

export default Review;

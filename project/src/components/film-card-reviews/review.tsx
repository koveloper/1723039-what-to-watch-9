import dayjs from 'dayjs';
import { Comment } from '../../types/commentary';

enum DateFormat {
    forAttr = 'YYYY-MM-DD',
    forOut = 'MMMM DD, YYYY'
}

function Review(props: Comment): JSX.Element {
  const attrDate = dayjs(props.date).format(DateFormat.forAttr);
  const displayDate = dayjs(props.date).format(DateFormat.forOut);
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{props.user.name}</cite>
          <time className="review__date" dateTime={attrDate}>{displayDate}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{props.rating}</div>
    </div>
  );
}

export default Review;

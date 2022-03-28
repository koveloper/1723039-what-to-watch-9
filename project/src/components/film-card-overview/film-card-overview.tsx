import { FilmData } from '../../types/film-data-type';
import { FILM_MARK_TABLE } from '../../utils/constants';

type FilmCardOverviewProps = {
  film: FilmData;
}

function FilmCardOverview(props: FilmCardOverviewProps): JSX.Element {
  const {rating, scoresCount, description, director, starring} = props.film;
  const mark = FILM_MARK_TABLE[Math.floor(rating)];
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{mark}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__desc">
        <div className="film-card__text">
          <p>{description}</p>
          <p className="film-card__director"><strong>Director: {director}</strong></p>
          <p className="film-card__starring"><strong>Starring: {starring.slice(0, 4).join(', ')} and other</strong></p>
        </div>
      </div>
    </>

  );
}

export default FilmCardOverview;

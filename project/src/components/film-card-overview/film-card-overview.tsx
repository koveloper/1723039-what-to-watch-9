import { FILM_MARK_TABLE } from '../../utils/constants';

type FilmCardOverviewProps = {
  rating: number;
  scoresCount: number;
  description: string;
  director: string;
  starring: string[];
}

function FilmCardOverview(props: FilmCardOverviewProps): JSX.Element {
  const mark = FILM_MARK_TABLE[Math.floor(props.rating)];
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{props.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{mark}</span>
          <span className="film-rating__count">{props.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__desc">
        <div className="film-card__text">
          <p>{props.description}</p>
          <p className="film-card__director"><strong>Director: {props.director}</strong></p>
          <p className="film-card__starring"><strong>Starring: {props.starring.slice(0, 4).join(', ')} and other</strong></p>
        </div>
      </div>
    </>

  );
}

export default FilmCardOverview;

import { useMemo } from 'react';
import { FilmMark } from '../../utils/constants';

type FilmCardOverviewProps = {
  rating: number;
  scoresCount: number;
  description: string;
  director: string;
  starring: string[];
}

function FilmCardOverview(props: FilmCardOverviewProps): JSX.Element {
  const mark = useMemo((): string => {
    if(props.rating >= 9) {
      return FilmMark.Awesome;
    }
    if(props.rating >= 8) {
      return FilmMark.VeryGood;
    }
    if(props.rating >= 7) {
      return FilmMark.Good;
    }
    if(props.rating >= 5) {
      return FilmMark.Normal;
    }
    return FilmMark.Bad;
  }, [props.rating]);
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

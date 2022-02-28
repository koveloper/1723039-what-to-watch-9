import { FilmDataType } from '../../types/film-data-type';
import { FilmMark } from '../../utils/constants';

const getLevelSignFromRating = (rating: number): string => {
  if(rating >= 9) {
    return FilmMark.Awesome;
  }
  if(rating >= 8) {
    return FilmMark.VeryGood;
  }
  if(rating >= 7) {
    return FilmMark.Good;
  }
  if(rating >= 5) {
    return FilmMark.Normal;
  }
  return FilmMark.Bad;
};

function FilmCardOverview(props: FilmDataType): JSX.Element {

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{props.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getLevelSignFromRating(props.rating)}</span>
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

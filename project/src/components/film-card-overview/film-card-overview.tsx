import { FilmDataProps } from '../../types/film-data-type';
import DescriptionParagraph from './description-paragraph';

function FilmCardOverview(props: FilmDataProps): JSX.Element {

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{props.score}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{props.rating}</span>
          <span className="film-rating__count">{props.ratingCount} ratings</span>
        </p>
      </div>
      <div className="film-card__desc">
        <div className="film-card__text">
          {props.description.map((descr) => <DescriptionParagraph key="descr-p" descr={descr}/>)}
          <p className="film-card__director"><strong>Director: {props.director}</strong></p>
          <p className="film-card__starring"><strong>Starring: {props.actors.slice(0, 4).join(', ')} and other</strong></p>
        </div>
      </div>
    </>

  );
}

export default FilmCardOverview;

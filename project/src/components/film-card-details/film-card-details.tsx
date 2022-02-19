import SimpleText from '../simple-text/simple-text';
import Details from './details';
import { FilmDataProps } from '../../types/film-data-type';

function FilmCardDetails(props: FilmDataProps): JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <Details title='Director'>{props.director}</Details>
        <Details title='Starring'>
          {props.actors.map((actorName, i) => (
            <SimpleText key="details-actors" addNewLine={i !== (props.actors.length - 1)}>{actorName}</SimpleText>
          ))}
        </Details>
      </div>
      <div className="film-card__text-col">
        <Details title='Run Time'>{props.duration}</Details>
        <Details title='Genre'>{props.genre}</Details>
        <Details title='Released'>{props.releaseYear}</Details>
      </div>
    </div>
  );
}

export default FilmCardDetails;

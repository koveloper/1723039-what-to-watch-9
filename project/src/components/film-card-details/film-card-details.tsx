import SimpleText from '../simple-text/simple-text';
import Details from './details';
import { FilmDataType } from '../../types/film-data-type';

const getTimeStrFromMinutes = (minutes: number): string => {
  if(minutes < 60) {
    return `${minutes}m`;
  }
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

function FilmCardDetails(props: FilmDataType): JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <Details title='Director'>{props.director}</Details>
        <Details title='Starring'>
          {props.starring.map((actorName, i) => (
            <SimpleText key="details-actors" addNewLine={i !== (props.starring.length - 1)}>{actorName}</SimpleText>
          ))}
        </Details>
      </div>
      <div className="film-card__text-col">
        <Details title='Run Time'>{getTimeStrFromMinutes(props.runTime)}</Details>
        <Details title='Genre'>{props.genre}</Details>
        <Details title='Released'>{props.released}</Details>
      </div>
    </div>
  );
}

export default FilmCardDetails;

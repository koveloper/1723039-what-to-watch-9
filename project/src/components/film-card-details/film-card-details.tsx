import SimpleText from '../simple-text/simple-text';
import Details from './details';
import { FilmData } from '../../types/film-data-type';
import { useMemo } from 'react';

function FilmCardDetails(props: FilmData): JSX.Element {
  const timeStr = useMemo<string>((): string => {
    if(props.runTime < 60) {
      return `${props.runTime}m`;
    }
    return `${Math.floor(props.runTime / 60)}h ${props.runTime % 60}m`;
  }, [props.runTime]);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <Details title='Director'>{props.director}</Details>
        <Details title='Starring'>
          {props.starring.map((actorName, i) => (
            <SimpleText key={`details-actors-${i.toString()}`} addNewLine={i !== (props.starring.length - 1)}>{actorName}</SimpleText>
          ))}
        </Details>
      </div>
      <div className="film-card__text-col">
        <Details title='Run Time'>{timeStr}</Details>
        <Details title='Genre'>{props.genre}</Details>
        <Details title='Released'>{props.released}</Details>
      </div>
    </div>
  );
}

export default FilmCardDetails;

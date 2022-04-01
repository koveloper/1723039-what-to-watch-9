import SimpleText from './simple-text';
import Detail from '../film-card-detail/detail';
import { useMemo } from 'react';
import { FilmData } from '../../types/film-data-type';

type FilmCardDetailsProps = {
  film: FilmData;
}

function FilmCardDetails(props: FilmCardDetailsProps): JSX.Element {
  const {runTime, director, starring, genre, released} = props.film;
  const timeStr = useMemo<string>((): string => {
    if(runTime < 60) {
      return `${runTime}m`;
    }
    return `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
  }, [runTime]);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <Detail title='Director'>{director}</Detail>
        <Detail title='Starring'>
          {starring.map((actorName, i) => (
            <SimpleText key={`details-actors-${i.toString()}`} addNewLine={i !== (starring.length - 1)}>{actorName}</SimpleText>
          ))}
        </Detail>
      </div>
      <div className="film-card__text-col">
        <Detail title='Run Time'>{timeStr}</Detail>
        <Detail title='Genre'>{genre}</Detail>
        <Detail title='Released'>{released}</Detail>
      </div>
    </div>
  );
}

export default FilmCardDetails;

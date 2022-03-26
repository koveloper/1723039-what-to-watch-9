import SimpleText from './simple-text';
import Detail from './detail';
import { useMemo } from 'react';

type FilmCardDetailsProps = {
  runTime: number;
  director: string;
  starring: string[];
  genre: string;
  released: number;
}

function FilmCardDetails(props: FilmCardDetailsProps): JSX.Element {
  const timeStr = useMemo<string>((): string => {
    if(props.runTime < 60) {
      return `${props.runTime}m`;
    }
    return `${Math.floor(props.runTime / 60)}h ${props.runTime % 60}m`;
  }, [props.runTime]);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <Detail title='Director'>{props.director}</Detail>
        <Detail title='Starring'>
          {props.starring.map((actorName, i) => (
            <SimpleText key={`details-actors-${i.toString()}`} addNewLine={i !== (props.starring.length - 1)}>{actorName}</SimpleText>
          ))}
        </Detail>
      </div>
      <div className="film-card__text-col">
        <Detail title='Run Time'>{timeStr}</Detail>
        <Detail title='Genre'>{props.genre}</Detail>
        <Detail title='Released'>{props.released}</Detail>
      </div>
    </div>
  );
}

export default FilmCardDetails;

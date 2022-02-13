import { FilmDataProps } from '../../types/film-data-type';
import SimpleText from '../simple-text/simple-text';

const packIntoDetailsItem = (title: string, value: number | string | JSX.Element[]): JSX.Element => (
  <p className="film-card__details-item">
    <strong className="film-card__details-name">{title}</strong>
    <span className="film-card__details-value">{value}</span>
  </p>
);

function FilmCardDetails(props: FilmDataProps): JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        {packIntoDetailsItem('Director', props.director)}
        {packIntoDetailsItem('Starring', props.actors.map((actorName, i) => <SimpleText key="details-actors" content={actorName} withNewLine={i !== (props.actors.length - 1)}/>))}
      </div>
      <div className="film-card__text-col">
        {packIntoDetailsItem('Run Time', props.duration)}
        {packIntoDetailsItem('Genre', props.genre)}
        {packIntoDetailsItem('Released', props.releaseYear)}
      </div>
    </div>
  );
}

export default FilmCardDetails;

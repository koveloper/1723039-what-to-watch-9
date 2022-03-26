import FilmLogo from '../film-logo/film-logo';
import { FilmData } from '../../types/film-data-type';
import { memo } from 'react';

type FilmsListProps = {
  films: FilmData[];
  muted?: boolean;
}

function FilmsList({ films, muted }: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmLogo key={film.id.toString()} film={film} muted={muted}/>)}
    </div>
  );
}

export default memo(FilmsList);

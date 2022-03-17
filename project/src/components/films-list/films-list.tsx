import FilmLogo from '../film-logo/film-logo';
import { FilmData } from '../../types/film-data-type';
import { memo } from 'react';

type FilmsListProps = {
  films: FilmData[];
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmLogo key={film.id.toString()} film={film}/>)}
    </div>
  );
}

export default memo(FilmsList);

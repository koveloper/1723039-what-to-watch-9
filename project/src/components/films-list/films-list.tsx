import FilmLogo from '../film-logo/film-logo';
import { FilmDataType } from '../../types/film-data-type';

type FilmsListProps = {
  films: FilmDataType[];
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmLogo key={film.id.toString()} film={film}/>)}
    </div>
  );
}

export default FilmsList;

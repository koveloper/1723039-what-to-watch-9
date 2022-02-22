import FilmLogo from '../film-logo/film-logo';
import { FilmDataType } from '../../types/film-data-type';

function FilmsList({films}: {films: FilmDataType[]}): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((props) => FilmLogo(props))}
    </div>
  );
}

export default FilmsList;

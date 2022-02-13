import FilmLogo from '../film-logo/film-logo';
import { FilmDataProps } from '../../types/film-data-type';

function FilmsList({films}: {films: FilmDataProps[]}): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((props) => FilmLogo(props))}
    </div>
  );
}

export default FilmsList;

import { Link } from 'react-router-dom';
import { GenreProps } from '../../types/genre-type';

const getGenreListItem = (props: GenreProps): JSX.Element => (
  <li key={props.key} className="catalog__genres-item">
    <Link to={props.url} className="catalog__genres-link">{props.title}</Link>
  </li>
);

function GenresList({genres}: {genres: GenreProps[]}): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => getGenreListItem(genre))}
    </ul>
  );
}

export default GenresList;

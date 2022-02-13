import { GenreProps } from '../../types/genre-type';
import GenreListItem from '../genre-list-item/genre-list-item';

function GenresList({genres}: {genres: GenreProps[]}): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => GenreListItem(genre))}
    </ul>
  );
}

export default GenresList;

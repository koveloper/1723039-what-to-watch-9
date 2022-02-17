import { GenreProps } from '../../types/genre-type';
import GenresListItem from './genres-list-item';

function GenresList({genres}: {genres: GenreProps[]}): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => <GenresListItem key="genre-item" {...genre}></GenresListItem>)}
    </ul>
  );
}

export default GenresList;

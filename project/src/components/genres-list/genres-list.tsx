import GenresListItem from './genres-list-item';

type GenresListProps = {
  genres: string[];
}

function GenresList({genres}: GenresListProps): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => <GenresListItem key={`genre-item-${genre}`} title={genre}></GenresListItem>)}
    </ul>
  );
}

export default GenresList;

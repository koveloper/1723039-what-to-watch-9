import GenresListItem from './genres-list-item';

type GenresListProps = {
  genres: string[];
  currentGenre: string;
  onGenreChange: (genre: string) => void;
}

function GenresList(props: GenresListProps): JSX.Element {
  return (
    <ul data-testid="genre-list" className="catalog__genres-list">
      {props.genres.map((genre) => <GenresListItem onSelect={(title) => props.onGenreChange(title)} key={`genre-item-${genre}`} title={genre} selected={props.currentGenre===genre}></GenresListItem>)}
    </ul>
  );
}

export default GenresList;

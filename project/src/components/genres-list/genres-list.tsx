import { useGenerateKeys } from '../../hooks/use-generate-keys';
import { MAX_GENRES_ON_SCREEN } from '../../utils/constants';
import GenresListItem from '../genres-list-item/genres-list-item';

type GenresListProps = {
  genres: string[];
  currentGenre: string;
  onGenreChange: (genre: string) => void;
}

function GenresList(props: GenresListProps): JSX.Element {
  const genresKeys = useGenerateKeys('genre', props.genres.length);
  return (
    <ul data-testid="genre-list" className="catalog__genres-list">
      {props.genres.slice(0, MAX_GENRES_ON_SCREEN).map((genre, i) => <GenresListItem onSelect={(title) => props.onGenreChange(title)} key={genresKeys[i]} title={genre} selected={props.currentGenre===genre}></GenresListItem>)}
    </ul>
  );
}

export default GenresList;

import { useDispatch, useSelector } from 'react-redux';
import { setGenre } from '../../store/action';
import { AppDispatch, State } from '../../types/state';
import GenresListItem from './genres-list-item';

type GenresListProps = {
  genres: string[];
}

function GenresList({genres}: GenresListProps): JSX.Element {
  const currentGenre = useSelector((state: State) => state.genre);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => <GenresListItem onSelect={(title) => dispatch(setGenre(title))} key={`genre-item-${genre}`} title={genre} selected={currentGenre===genre}></GenresListItem>)}
    </ul>
  );
}

export default GenresList;

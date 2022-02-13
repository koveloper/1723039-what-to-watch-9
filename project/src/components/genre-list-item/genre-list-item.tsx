
import { GenreProps } from '../../types/genre-type';

function GenreListItem(props: GenreProps): JSX.Element {
  return (
    <li key={props.key} className="catalog__genres-item">
      <a href={props.url} className="catalog__genres-link">{props.title}</a>
    </li>
  );
}

export default GenreListItem;

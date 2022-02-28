import { Link } from 'react-router-dom';

type GenresListItemProps = {
  title: string;
}

function GenresListItem({title}: GenresListItemProps): JSX.Element {
  return (
    <li className="catalog__genres-item">
      <Link to='#' className="catalog__genres-link">{title}</Link>
    </li>
  );
}

export default GenresListItem;

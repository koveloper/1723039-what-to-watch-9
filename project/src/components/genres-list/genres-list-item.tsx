import { Link } from 'react-router-dom';

function GenresListItem({url, title}: {url: string, title: string}): JSX.Element {
  return (
    <li className="catalog__genres-item">
      <Link to={url} className="catalog__genres-link">{title}</Link>
    </li>
  );
}

export default GenresListItem;

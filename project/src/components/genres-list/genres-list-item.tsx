import { Link } from 'react-router-dom';

type GenresListItemProps = {
  title: string;
  selected: boolean;
  onSelect: (title: string) => void;
}

function GenresListItem({title, selected, onSelect}: GenresListItemProps): JSX.Element {
  return (
    <li className={selected ? 'catalog__genres-item  catalog__genres-item--active' : 'catalog__genres-item'}>
      <Link to='#' onClick={() => onSelect(title)} className="catalog__genres-link">{title}</Link>
    </li>
  );
}

export default GenresListItem;

import { memo, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

type GenresListItemProps = {
  title: string;
  selected: boolean;
  onSelect: (title: string) => void;
}

function GenresListItem({title, selected, onSelect}: GenresListItemProps): JSX.Element {
  const handleLinkClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    onSelect(title);
  };
  return (
    <li className={selected ? 'catalog__genres-item  catalog__genres-item--active' : 'catalog__genres-item'}>
      <Link to='' onClick={handleLinkClick} className="catalog__genres-link">{title}</Link>
    </li>
  );
}

export default memo(GenresListItem, (prevProps, newProps) => (prevProps.selected === newProps.selected));

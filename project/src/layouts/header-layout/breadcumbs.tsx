import { Link } from 'react-router-dom';
import { DefaultLayoutProps } from '../../types/common-types';

function Breadcumbs(props: DefaultLayoutProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to=".." className="breadcrumbs__link">{props.children}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to="." className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Breadcumbs;

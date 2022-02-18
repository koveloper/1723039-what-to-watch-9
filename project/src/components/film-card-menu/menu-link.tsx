import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';


type MenuLinkProps = {
    isActive: boolean;
    onClick: () => void;
};

function MenuLink(props: PropsWithChildren<MenuLinkProps>): JSX.Element {
  return (
    <li className={props.isActive ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
      <Link onClick={props.onClick} to='#' className="film-nav__link">{props.children}</Link>
    </li>
  );
}

export default MenuLink;

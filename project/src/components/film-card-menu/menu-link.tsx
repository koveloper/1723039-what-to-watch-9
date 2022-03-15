import { memo, PropsWithChildren, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

type MenuLinkProps = {
    isActive: boolean;
    onClick: () => void;
};

function MenuLink(props: PropsWithChildren<MenuLinkProps>): JSX.Element {
  const onClickHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    props.onClick();
  };
  return (
    <li className={props.isActive ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
      <Link onClick={onClickHandler} to='#' className="film-nav__link">{props.children}</Link>
    </li>
  );
}

export default memo(MenuLink, (prevProps, newProps) => (prevProps.isActive === newProps.isActive));

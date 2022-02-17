import Logo from '../../components/logo/logo';
import { PropsWithChildren } from 'react';
import { AppRoute } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';

type HeaderLayoutProps = {
    title?: string;
};

const getTitleComponent = (title?: string): JSX.Element | null => (title
  ? <h1 className="page-title user-page__title">{title}</h1>
  : null);

const getBreadcumbsComponent = (title: string): JSX.Element => (
  <nav className="breadcrumbs">
    <ul className="breadcrumbs__list">
      <li className="breadcrumbs__item">
        <Link to=".." className="breadcrumbs__link">{title}</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link to="." className="breadcrumbs__link">Add review</Link>
      </li>
    </ul>
  </nav>
);

function HeaderLayout(props: PropsWithChildren<HeaderLayoutProps>): JSX.Element {
  const url = useLocation();
  let titleComponent = null;
  let classes = 'page-header film-card__head';
  // const match =
  if(matchPath(url.pathname, AppRoute.SignIn) || matchPath(url.pathname, AppRoute.User)) {
    classes = 'page-header user-page__head';
    titleComponent = getTitleComponent(props.title);
  } else if(matchPath(url.pathname, AppRoute.AddReview)) {
    classes = 'page-header';
    titleComponent = getBreadcumbsComponent(props.title || '');
  }
  return (
    <header className={classes}>
      <Logo isLight={false}/>
      {titleComponent}
      {props.children}
    </header>
  );
}

export default HeaderLayout;

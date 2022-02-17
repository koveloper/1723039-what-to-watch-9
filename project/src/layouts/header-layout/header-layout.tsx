import Logo from '../../components/logo/logo';
import { PropsWithChildren } from 'react';
import { PageType } from '../../utils/constants';
import { Link } from 'react-router-dom';

type HeaderLayoutProps = {
    pageType: PageType;
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

const getClasses = (pageType: PageType): string => {
  switch(pageType) {
    case PageType.Film: return 'page-header film-card__head';
    case PageType.User: return 'page-header user-card__head';
    default: return 'page-header';
  }
};

function HeaderLayout(props: PropsWithChildren<HeaderLayoutProps>): JSX.Element {
  const classes = getClasses(props.pageType);
  let titleComponent = null;
  switch(props.pageType) {
    case PageType.User:
      titleComponent = getTitleComponent(props.title);
      break;
    case PageType.AddReview:
      titleComponent = getBreadcumbsComponent(props.title || '');
      break;
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

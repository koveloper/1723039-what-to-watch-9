const getClasses = (isActive: boolean): string => (isActive
  ? 'film-nav__item film-nav__item--active'
  : 'film-nav__item'
);

function FilmCardMenuLink({isActive, title, link}: {
  isActive: boolean;
  title: string;
  link: string;
}): JSX.Element {
  return (
    <li className={getClasses(isActive)}>
      <a href={link} className="film-nav__link">{title}</a>
    </li>
  );
}

export default FilmCardMenuLink;

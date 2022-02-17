import { Path } from 'history';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FilmInfoType } from '../../utils/constants';

type FilmInfoLink = {
  isActive: boolean;
  url: string;
  title: string;
}

function FilmCardMenuLink(props: FilmInfoLink): JSX.Element {
  const classes = props.isActive
    ? 'film-nav__item film-nav__item--active'
    : 'film-nav__item';
  return (
    <li className={classes}>
      <Link to={props.url} className="film-nav__link">{props.title}</Link>
    </li>
  );
}

const createLinkInfo = (url: Path, type: FilmInfoType): FilmInfoLink => ({
  isActive: url.hash === `#${type}`,
  url: `${url.pathname}#${type}`,
  title: type[0].toUpperCase() + type.substring(1),
});

function FilmCardMenu(): JSX.Element {
  const url = useLocation();
  const linksInfoArr: FilmInfoLink[] = Object.values(FilmInfoType).map((v) => createLinkInfo(url, v));
  const active = linksInfoArr.find((linkInfo) => linkInfo.isActive);
  linksInfoArr[0].isActive = linksInfoArr[0].isActive || active === undefined;

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {linksInfoArr.map((linkInfo, i) => <FilmCardMenuLink key="film-card-link" {...linkInfo}/>)}
      </ul>
    </nav>
  );
}

export default FilmCardMenu;

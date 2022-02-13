import { getBlankLink } from '../../utils/logic-utils';
import { FilmSelectedTab } from '../../types/film-seletcted-tab';
import FilmCardMenuLink from '../film-card-menu-link/film-card-menu-link';

function FilmCardMenu({activeTab}: {activeTab: FilmSelectedTab}): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <FilmCardMenuLink isActive={activeTab === 'overview'} link={getBlankLink()} title="Overview"/>
        <FilmCardMenuLink isActive={activeTab === 'details'} link={getBlankLink()} title="Details"/>
        <FilmCardMenuLink isActive={activeTab === 'reviews'} link={getBlankLink()} title="Reviews"/>
      </ul>
    </nav>
  );
}

export default FilmCardMenu;

import { useState } from 'react';
import { FilmInfoType } from '../../utils/constants';
import FilmCardMenuLink from '../film-card-menu-link/film-card-menu-link';

type FilmCardMenuProps = {
  onTabSelect: (activeTab: FilmInfoType) => void;
}

function FilmCardMenu(props: FilmCardMenuProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmInfoType.Overview);

  const handleLinkClick = (tab: FilmInfoType) => {
    setActiveTab(tab);
    props.onTabSelect(tab);
  };

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <FilmCardMenuLink key='overview' isActive={activeTab === FilmInfoType.Overview} onClick={() => handleLinkClick(FilmInfoType.Overview)}>
          Overview
        </FilmCardMenuLink>
        <FilmCardMenuLink key='details' isActive={activeTab === FilmInfoType.Details} onClick={() => handleLinkClick(FilmInfoType.Details)}>
          Details
        </FilmCardMenuLink>
        <FilmCardMenuLink key='reviews' isActive={activeTab === FilmInfoType.Reviews} onClick={() => handleLinkClick(FilmInfoType.Reviews)}>
          Reviews
        </FilmCardMenuLink>
      </ul>
    </nav>
  );
}

export default FilmCardMenu;

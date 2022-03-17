import { useState } from 'react';
import { FilmInfoType } from '../../utils/constants';
import MenuLink from './menu-link';

type FilmCardMenuProps = {
  onTabSelect: (activeTab: FilmInfoType) => void;
}

function FilmCardMenu(props: FilmCardMenuProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmInfoType.Overview);

  const onClickHandler = (tab: FilmInfoType) => {
    setActiveTab(tab);
    props.onTabSelect(tab);
  };

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <MenuLink key='overview' isActive={activeTab === FilmInfoType.Overview} onClick={() => onClickHandler(FilmInfoType.Overview)}>
          Overview
        </MenuLink>
        <MenuLink key='details' isActive={activeTab === FilmInfoType.Details} onClick={() => onClickHandler(FilmInfoType.Details)}>
          Details
        </MenuLink>
        <MenuLink key='reviews' isActive={activeTab === FilmInfoType.Reviews} onClick={() => onClickHandler(FilmInfoType.Reviews)}>
          Reviews
        </MenuLink>
      </ul>
    </nav>
  );
}

export default FilmCardMenu;

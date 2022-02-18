import { useState } from 'react';
import { FilmInfoType } from '../../utils/constants';
import { FilmCardMenuProps } from './film-card-menu-props';
import MenuLink from './menu-link';

function FilmCardMenu(props: FilmCardMenuProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmInfoType.Overview);

  const onClickHandler = (tab: FilmInfoType) => {
    setActiveTab(tab);
    props.onTabSelect(tab);
  };

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <MenuLink isActive={activeTab === FilmInfoType.Overview} onClick={() => onClickHandler(FilmInfoType.Overview)}>
          Overview
        </MenuLink>
        <MenuLink isActive={activeTab === FilmInfoType.Details} onClick={() => onClickHandler(FilmInfoType.Details)}>
          Details
        </MenuLink>
        <MenuLink isActive={activeTab === FilmInfoType.Reviews} onClick={() => onClickHandler(FilmInfoType.Reviews)}>
          Reviews
        </MenuLink>
      </ul>
    </nav>
  );
}

export default FilmCardMenu;

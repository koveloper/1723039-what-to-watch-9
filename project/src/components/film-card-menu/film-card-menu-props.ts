import { FilmInfoType } from '../../utils/constants';

export type FilmCardMenuProps = {
    onTabSelect: (activeTab: FilmInfoType) => void;
}

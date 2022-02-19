import { FilmInfoType } from '../utils/constants';
import { FilmDataProps } from './film-data-type';

export type MoviePageProps = {
    film: FilmDataProps;
    otherFilms: FilmDataProps[];
    selectedTab: FilmInfoType;
}

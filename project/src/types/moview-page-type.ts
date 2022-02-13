import { FilmDataProps } from './film-data-type';

export type MoviePageProps = {
    film: FilmDataProps;
    otherFilms: FilmDataProps[];
    selectedTab: 'overview' | 'details' | 'reviews';
}

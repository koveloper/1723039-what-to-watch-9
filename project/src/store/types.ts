import { store } from '.';
import { FilmDataType, Films } from '../types/film-data-type';

export type State = {
    genre: string;
    films: Films | null;
    promoFilm: FilmDataType | null;
    maxFilmsOnPage: number;
};

export type AppDispatch = typeof store.dispatch;

import { store } from '../store';
import { FilmDataType } from './film-data-type';

export type State = {
    genre: string;
    films: FilmDataType[];
};

export type AppDispatch = typeof store.dispatch;

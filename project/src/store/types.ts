import { store } from '.';
import { FilmDataType, Films } from '../types/film-data-type';
import { UserWithoutTokenType } from '../types/user-type';
import { AuthStatus } from './constants';

export type State = {
    genre: string;
    films: Films | null;
    promoFilm: FilmDataType | null;
    maxFilmsOnPage: number;
    authStatus: AuthStatus;
    userData: UserWithoutTokenType | null;
};

export type AppDispatch = typeof store.dispatch;

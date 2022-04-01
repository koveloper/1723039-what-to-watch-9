import { store } from '.';
import { FilmData, Films, FilmsFull } from '../types/film-data-type';
import { UserWithoutTokenType } from '../types/user-type';
import { AuthStatus } from './constants';

export type FilmsState = {
    all: Films | null;
    promoFilm: FilmData | null;
    fullDataFilms: FilmsFull;
}

export type UserState = {
    authStatus: AuthStatus;
    userData: UserWithoutTokenType | null;
    favoriteFilmsIdList: number[] | null;
}

export type AppErrorType = {
    type: string;
    message: string;
}
export type ServiceState = {
    redirect: string | null;
    error: AppErrorType | null;
}

export type State = ReturnType<typeof store.getState>;

export type Store = typeof store;

export type AppDispatch = typeof store.dispatch;

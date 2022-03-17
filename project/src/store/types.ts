import { store } from '.';
import { CommentForPost, Comments } from '../types/commentary';
import { FilmData, Films, FilmsFull } from '../types/film-data-type';
import { UserWithoutTokenType } from '../types/user-type';
import { AuthStatus } from './constants';

export type SelectedFilmState = {
    filmData: FilmData | null | undefined;
    filmsLikeSelected: Films | null;
    comments: Comments| null;
    userComment: CommentForPost | null | undefined;
};

export type FilmsState = {
    films: Films | null;
    promoFilm: FilmData | null;
    fullDataFilms: FilmsFull;
}

export type UserState = {
    authStatus: AuthStatus;
    userData: UserWithoutTokenType | null;
    favoriteFilmsIdList: number[] | null;
}

export type ServiceState = {
    redirect: string | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

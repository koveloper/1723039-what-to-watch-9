import { store } from '.';
import { CommentForPost, Comments } from '../types/commentary';
import { FilmDataType, Films } from '../types/film-data-type';
import { UserWithoutTokenType } from '../types/user-type';
import { AuthStatus } from './constants';

export type SelectedFilmState = {
    selectedFilm: FilmDataType | null | undefined;
    filmsLikeSelected: Films | null;
    comments: Comments| null;
    userComment: CommentForPost | null | undefined;
};

export type FilmsState = {
    films: Films | null;
    promoFilm: FilmDataType | null;
}

export type UserState = {
    authStatus: AuthStatus;
    userData: UserWithoutTokenType | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

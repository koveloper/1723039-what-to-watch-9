import { store } from '.';
import { CommentForPost, Comments } from '../types/commentary';
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
    selectedFilm: FilmDataType | null | undefined;
    filmsLikeSelected: Films | null;
    comments: Comments| null;
    userComment: CommentForPost | null | undefined;
};

export type AppDispatch = typeof store.dispatch;

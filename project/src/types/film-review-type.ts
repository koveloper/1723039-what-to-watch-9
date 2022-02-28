import { UserType } from './user-type';

export type FilmReviewType = {
    id: number;
    user: UserType;
    raiting: number;
    comment: string;
    date: string;
};

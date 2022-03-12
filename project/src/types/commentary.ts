import { UserType } from './user-type';

export type Comment = {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: Pick<UserType, 'id' | 'name'>;
}

export type Comments = Comment[];

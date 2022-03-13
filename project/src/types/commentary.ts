import { UserType } from './user-type';

export type Comment = {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: Pick<UserType, 'id' | 'name'>;
}

export type CommentForPost = Pick<Comment, 'comment' | 'id' | 'rating'>;

export type Comments = Comment[];

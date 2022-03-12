export type UserType = {
    avatarUrl: string;
    email: string;
    id: number;
    name: string;
    token: string;
}

export type UserWithoutTokenType = Omit<UserType, 'token'>

export enum AppRoute {
    Root = '/',
    SignIn = '/login',
    User = '/mylist',
    Films = '/films',
    Film = '/films/:id/*',
    AddReview = ':id/review',
    Player = '/player/:id',
    Err404 = '/err404',
}

export enum FilmInfoType {
    Overview = 'overview',
    Details = 'details',
    Reviews = 'reviews'
}

export enum PosterSize {
    Big = 'big',
    Medium = 'medium',
    Small = 'small'
}

export enum FilmMark {
    Bad = 'Bad',
    Normal = 'Norma',
    Good = 'Good',
    VeryGood = 'Very good',
    Awesome = 'Awesome'
}

export const ALL_GENRES = 'All genres';

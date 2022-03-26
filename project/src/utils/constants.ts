export enum AppRoute {
    Root = '/',
    SignIn = '/login',
    User = '/mylist',
    Films = '/films',
    Film = '/films/:id/*',
    AddReview = ':id/review',
    Player = '/player/:id',
    PlayerRoot = '/player',
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
export const APP_TITLE = 'WTW';
export const ALL_GENRES = 'All genres';
export const FILMS_ON_PAGE_INITIAL = 8;
export const FILMS_ON_PAGE_STEP = 8;

export enum NameSpace {
    Films = 'films',
    User = 'user',
    Service = 'service',
}

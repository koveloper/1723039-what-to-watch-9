export enum AppRoute {
    Root = '/',
    SignOut = '/logout',
    SignIn = '/login',
    User = '/mylist',
    Films = '/films',
    Film = '/films/:id/*',
    AddReview = ':id/review',
    Player = '/player/:id/*',
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
    Normal = 'Normal',
    Good = 'Good',
    VeryGood = 'Very good',
    Awesome = 'Awesome',
    Unknown = 'Unknown',
}

export enum NameSpace {
    Films = 'films',
    User = 'user',
    Service = 'service',
}

export enum AppError {
    PostReview = 'post-review',
    GetFavorite = 'get-favorite',
    SetFavorite = 'set-favorite',
    LogOut = 'log-out',
    LogIn = 'log-in',
}

export enum FilmCardButtonType {
    Play = 'Play',
    MyList = 'MyList',
    AddReview = 'AddReview'
}

export enum HeaderType {
    FilmCard = 'page-header film-card__head',
    UserOrSignIn = 'page-header user-page__head',
    AddReview = 'page-header'
}

export const FILM_MARK_TABLE: FilmMark[] = [
  FilmMark.Unknown, //0
  FilmMark.Bad, //1
  FilmMark.Bad, //2
  FilmMark.Normal, //3
  FilmMark.Normal, //4
  FilmMark.Good, //5
  FilmMark.Good, //6
  FilmMark.Good, //7
  FilmMark.VeryGood, //8
  FilmMark.VeryGood, //9
  FilmMark.Awesome, //10
];

export const APP_TITLE = 'WTW';
export const ALL_GENRES = 'All genres';
export const FILMS_ON_PAGE_INITIAL = 8;
export const FILMS_ON_PAGE_STEP = 8;
export const MAX_GENRES_ON_SCREEN = 10;
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 400;


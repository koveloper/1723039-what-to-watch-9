export enum AppRoute {
    Root = '/',
    SignIn = '/login',
    User = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id'
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

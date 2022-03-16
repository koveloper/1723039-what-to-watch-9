export const BASE_URL = 'https://9.react.pages.academy/wtw';
export const BASE_TIMEOUT_MS = 5000;

export const APIRoute = {
  Films: '/films',
  PromoFilm: '/promo',
  Login: '/login',
  Film: (id: number) => `/films/${id}`,
  SimilarFilms: (id: number) => `/films/${id}/similar`,
  Comments: (id: number) => `/comments/${id}`,
  FavoriteFilms: '/favorite',
};

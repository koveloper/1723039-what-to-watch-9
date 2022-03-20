import { store } from '../store';
import { CommentForPost } from '../types/commentary';
import { LoginData } from '../types/login-data';
import { getNetworkInstance } from './network';
import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction, getFavoriteFilms, getFullDataFilmAction, loginAction, postCommentAction, setFavoriteFilm } from './thunks';

export const api = {
  network: getNetworkInstance(),
  fetchFilms: () => store.dispatch(fetchFilmsAction()),
  fetchPromoFilm: () => store.dispatch(fetchPromoFilmAction()),
  checkAuth: () => store.dispatch(checkAuthAction()),
  login: (props: LoginData) => store.dispatch(loginAction(props)),
  fetchFilmFullData: (id: number) => store.dispatch(getFullDataFilmAction(id)),
  postReview: (props: CommentForPost) => store.dispatch(postCommentAction(props)),
  fetchFavoriteFilms: () => store.dispatch(getFavoriteFilms()),
  setFavoriteStatus: (id: number, isFavorite: boolean) => store.dispatch(setFavoriteFilm({id, isFavorite})),
};

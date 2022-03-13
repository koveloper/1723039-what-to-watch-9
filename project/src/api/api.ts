import { store } from '../store';
import { CommentForPost } from '../types/commentary';
import { LoginData } from '../types/login-data';
import { getNetworkInstance } from './network';
import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction, getCommentsAction, getFilmsLikeSelectedAction, getSelectedFilmAction, loginAction, postCommentAction } from './thunks';

export const api = {
  network: getNetworkInstance(),
  fetchFilms: () => store.dispatch(fetchFilmsAction()),
  fetchPromoFilm: () => store.dispatch(fetchPromoFilmAction()),
  checkAuth: () => store.dispatch(checkAuthAction()),
  login: (props: LoginData) => store.dispatch(loginAction(props)),
  fetchSelectedFilm: (id: number) => store.dispatch(getSelectedFilmAction(id)),
  fetchSimilarFilms: (id: number) => store.dispatch(getFilmsLikeSelectedAction(id)),
  fetchComments: (id: number) => store.dispatch(getCommentsAction(id)),
  postReview: (props: CommentForPost) => store.dispatch(postCommentAction(props)),
};

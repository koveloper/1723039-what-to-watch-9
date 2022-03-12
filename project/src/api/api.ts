import { store } from '../store';
import { LoginData } from '../types/login-data';
import { getNetworkInstance } from './network';
import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction, getComments, getFilmsLikeSelected, getSelectedFilmAction, loginAction } from './thunks';

export const api = {
  network: getNetworkInstance(),
  fetchFilms: () => store.dispatch(fetchFilmsAction()),
  fetchPromoFilm: () => store.dispatch(fetchPromoFilmAction()),
  checkAuth: () => store.dispatch(checkAuthAction()),
  login: (props: LoginData) => store.dispatch(loginAction(props)),
  fetchSelectedFilm: (id: number) => store.dispatch(getSelectedFilmAction(id)),
  fetchSimilarFilms: (id: number) => store.dispatch(getFilmsLikeSelected(id)),
  fetchComments: (id: number) => store.dispatch(getComments(id)),
};

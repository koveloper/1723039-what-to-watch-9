import { store } from '../store';
import { LoginData } from '../types/login-data';
import { getNetworkInstance } from './network';
import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction, loginAction } from './thunks';

export const api = {
  network: getNetworkInstance(),
  fetchFilms: () => store.dispatch(fetchFilmsAction()),
  fetchPromoFilm: () => store.dispatch(fetchPromoFilmAction()),
  checkAuth: () => store.dispatch(checkAuthAction()),
  login: (props: LoginData) => store.dispatch(loginAction(props)),
};

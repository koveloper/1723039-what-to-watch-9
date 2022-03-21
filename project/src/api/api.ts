import { AxiosInstance } from 'axios';
import { store } from '../store';
import { Store } from '../store/types';
import { CommentForPost } from '../types/commentary';
import { LoginData } from '../types/login-data';
import { getNetworkInstance } from './network';
import { createAsyncActions } from './thunks';

export const createAPI = (storeInstance: Store, network?: AxiosInstance) => {
  if(!network) {
    network = getNetworkInstance();
  }
  const asyncActions = createAsyncActions(storeInstance.dispatch, network);
  return {
    //tested
    fetchFilms: () => storeInstance.dispatch(asyncActions.fetchFilmsAction()),
    //tested
    fetchPromoFilm: () => storeInstance.dispatch(asyncActions.fetchPromoFilmAction()),
    //tested
    checkAuth: () => storeInstance.dispatch(asyncActions.checkAuthAction()),
    //tested
    login: (props: LoginData) => storeInstance.dispatch(asyncActions.loginAction(props)),
    //tested: 200, error
    fetchFilmFullData: (id: number) => storeInstance.dispatch(asyncActions.getFullDataFilmAction(id)),
    //tested: 200, error
    postReview: (props: CommentForPost) => storeInstance.dispatch(asyncActions.postCommentAction(props)),
    //tested
    fetchFavoriteFilms: () => storeInstance.dispatch(asyncActions.getFavoriteFilms()),
    //tested
    setFavoriteStatus: (id: number, isFavorite: boolean) => storeInstance.dispatch(asyncActions.setFavoriteFilm({id, isFavorite})),
  };
};

export const api = createAPI(store);



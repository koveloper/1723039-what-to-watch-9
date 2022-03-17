import { useCallback, useEffect, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api';
import { ButtonType } from '../components/film-card-buttons/constants';
import { store } from '../store';
import { AuthStatus } from '../store/constants';
import { setRedirect } from '../store/service-process/service-process';
import { AppDispatch, State } from '../store/types';
import { FilmData, FilmFullData, Films } from '../types/film-data-type';
import { AppRoute } from '../utils/constants';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

//////////////////////////////////////////
export const useFilmIdFromUrl = (): number => {
  const params = useParams();
  const id = +(params.id || 0);
  return id;
};

//////////////////////////////////////////
export const useAuth = (): boolean => {
  const {authStatus} = useSelector((state: State) => state.user);
  return authStatus === AuthStatus.Authorized;
};

//////////////////////////////////////////
export const useAvatar = (): string => {
  const {userData} = useSelector((state: State) => state.user);
  return userData ? userData.avatarUrl : '';
};

/////////////////////////////////////////
export const useFilms = (): Films | null => useSelector((state: State) => state.films.films);

/////////////////////////////////////////
export const useFilmData = (id: number): FilmData | undefined | null => {
  const films = useFilms();
  if(!films) {
    return undefined;
  }
  return films.find((f) => f.id === id) || null;
};

/////////////////////////////////////////
export const useFullFilmData = (id: number): FilmFullData | undefined => {
  const films = useSelector((state: State) => state.films.fullDataFilms);
  if(!(id in films)) {
    return undefined;
  }
  return films[id];
};

/////////////////////////////////////////
export const useFavoriteFilms = (): Films | undefined => {
  const favoriteFilmsId = useSelector((state: State) => state.user.favoriteFilmsIdList);
  const films = useFilms();
  const favors = useMemo<Films | undefined>(() => {
    const arr:Films = [];
    if(!favoriteFilmsId) {
      return undefined;
    }
    if(!films) {
      return [];
    }
    favoriteFilmsId.forEach((id) => {
      const film = films.find((f) => f.id === id);
      if(film) {
        arr.push(film);
      }
    });
    return arr;
  }, [films, favoriteFilmsId]);
  return favors;
};

/////////////////////////////////////////
export const usePromoFilm = (): FilmData | null => {
  const {promoFilm} = useSelector((state: State) => state.films);
  return promoFilm;
};


export const useFavorite = (id: number): boolean => {
  const favorIds = useSelector((state: State) => state.user.favoriteFilmsIdList);
  if(!favorIds) {
    api.fetchFavoriteFilms();
    return false;
  }
  return !!favorIds.find((i) => i === id);
};

/////////////////////////////////////////
export const useButtonsDefaultHandler = (id: number) : (type: ButtonType) => void => {
  const navigate = useNavigate();
  const isFavorite = useFavorite(id);
  const actionButtonClickHandler = useCallback((type: ButtonType) => {
    switch(type) {
      case ButtonType.Play:
        navigate(AppRoute.Player.replace(':id', `${id}`));
        break;
      case ButtonType.MyList:
        api.setFavoriteStatus(id, !isFavorite);
        break;
      case ButtonType.AddReview:
        navigate('review');
        break;
    }
  }, [id, isFavorite]);
  return actionButtonClickHandler;
};

/////////////////////////////////////////
export const useRedirect = () => {
  const navigate = useNavigate();
  const { redirect } = useSelector((state: State) => state.service);
  useEffect(() => {
    if(!redirect) {
      return;
    }
    store.dispatch(setRedirect(null));
    navigate(redirect);
  }, [redirect]);
};

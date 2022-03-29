import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../api/api';
import { State } from '../store/types';
import { Films } from '../types/film-data-type';
import { useAuth } from './use-auth';
import { useFilms } from './use-films';

export const useFavoriteFilms = (): undefined | null | Films  => {
  const favoriteFilmsId = useSelector((state: State) => state.user.favoriteFilmsIdList);
  const films = useFilms();
  const isAuthorized = useAuth();
  const favors = useMemo<Films | undefined | null>(() => {
    if(!isAuthorized) {
      return null;
    }
    const arr:Films = [];
    if(!favoriteFilmsId) {
      api.fetchFavoriteFilms();
      return undefined;
    }
    if(!films) {
      return null;
    }
    favoriteFilmsId.forEach((id) => {
      const film = films.find((f) => f.id === id);
      if(film) {
        arr.push(film);
      }
    });
    return arr;
  }, [films, favoriteFilmsId, isAuthorized]);
  return favors;
};

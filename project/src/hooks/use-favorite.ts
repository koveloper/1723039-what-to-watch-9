import { useSelector } from 'react-redux';
import { State } from '../store/types';
import { useAuth } from './use-auth';
import { useFavoriteFilms } from './use-favorite-films';

export const useFavorite = (id: number): boolean => {
  const isAuthorized = useAuth();
  const favorIds = useFavoriteFilms();
  return isAuthorized && !!favorIds?.find((f) => f.id === id);
};

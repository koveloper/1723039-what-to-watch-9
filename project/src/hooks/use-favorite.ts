import { useSelector } from 'react-redux';
import { State } from '../store/types';
import { useAuth } from './use-auth';

export const useFavorite = (id: number): boolean => {
  const isAuthorized = useAuth();
  const favorIds = useSelector((state: State) => state.user.favoriteFilmsIdList);
  return !!isAuthorized && !!favorIds?.includes(id);
};

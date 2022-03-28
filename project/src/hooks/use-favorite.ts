import { useSelector } from 'react-redux';
import { State } from '../store/types';
import { useAuth } from './use-auth';

export const useFavorite = (id: number): boolean => {
  const isAuthorized = useAuth();
  const favorIds = useSelector((state: State) => state.user.favoriteFilmsIdList);
  if(!isAuthorized || ! favorIds) {
    return false;
  }
  return !!favorIds.find((i) => i === id);
};

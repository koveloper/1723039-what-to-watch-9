import { useSelector } from 'react-redux';
import { api } from '../api/api';
import { State } from '../store/types';

export const useFavorite = (id: number): boolean | undefined => {
  const favorIds = useSelector((state: State) => state.user.favoriteFilmsIdList);
  if(!favorIds) {
    api.fetchFavoriteFilms();
    return undefined;
  }
  return !!favorIds.find((i) => i === id);
};

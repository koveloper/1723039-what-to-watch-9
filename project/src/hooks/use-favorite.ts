import { useFavoriteFilms } from './use-favorite-films';

export const useFavorite = (id: number): boolean => {
  const favorFilms = useFavoriteFilms();
  if(!favorFilms) {
    return false;
  }
  return !!favorFilms.find((f) => f.id === id);
};

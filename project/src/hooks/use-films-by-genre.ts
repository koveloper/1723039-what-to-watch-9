import { Films } from '../types/film-data-type';
import { ALL_GENRES } from '../utils/constants';
import { useFilms } from './use-films';

export const useFilmsByGenre = (genre: string): Films => {
  const films = useFilms();
  if(!films) {
    return [];
  }
  if(genre === ALL_GENRES) {
    return films;
  }
  return films.filter((f) => f.genre === genre);
};

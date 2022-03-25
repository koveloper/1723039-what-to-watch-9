import { FilmData } from '../types/film-data-type';
import { useFilms } from './use-films';

export const useFilmData = (id: number): FilmData | undefined | null => {
  const films = useFilms();
  if(!films) {
    return undefined;
  }
  return films.find((f) => f.id === id) || null;
};

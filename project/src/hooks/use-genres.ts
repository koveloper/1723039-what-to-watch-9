import { ALL_GENRES } from '../utils/constants';
import { useFilms } from './use-films';

export const useGenres = (): string[] => {
  const films = useFilms();
  if(!films) {
    return [];
  }
  const genres = Object.values(films.reduce((prev, curr) => Object.assign(prev, {[curr.genre]: curr.genre}), {})) as string[];
  return [
    ALL_GENRES,
    ...genres,
  ];
};

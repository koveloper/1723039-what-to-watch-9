import { useSelector } from 'react-redux';
import { State } from '../store/types';
import { FilmFullData } from '../types/film-data-type';

export const useFullFilmData = (id: number): FilmFullData | undefined => {
  const films = useSelector((state: State) => state.films.fullDataFilms);
  if(!(id in films)) {
    return undefined;
  }
  return films[id];
};

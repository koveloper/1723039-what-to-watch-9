import { useSelector } from 'react-redux';
import { State } from '../store/types';
import { FilmData } from '../types/film-data-type';

export const usePromoFilm = (): FilmData | null => {
  const {promoFilm} = useSelector((state: State) => state.films);
  return promoFilm;
};

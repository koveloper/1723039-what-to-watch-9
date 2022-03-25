import { useSelector } from 'react-redux';
import { State } from '../store/types';
import { Films } from '../types/film-data-type';

export const useFilms = (): Films | null => useSelector((state: State) => state.films.all);

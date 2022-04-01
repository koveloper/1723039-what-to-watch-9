import { useParams } from 'react-router-dom';
import { UNKNOWN_FILM_ID } from '../utils/constants';

export const useFilmIdFromUrl = (): number => {
  const params = useParams();
  const id = +(params.id || UNKNOWN_FILM_ID);
  return id;
};

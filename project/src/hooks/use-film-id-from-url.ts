import { useParams } from 'react-router-dom';

export const useFilmIdFromUrl = (): number => {
  const params = useParams();
  const id = +(params.id || -999);
  return id;
};

import Player from '../../components/player/player';
import Error404 from '../error-404/error-404';
import { Route, Routes } from 'react-router-dom';
import { useFilmIdFromUrl } from '../../hooks/use-film-id-from-url';
import { useFilmData } from '../../hooks/use-film-data';
import Spinner from '../../components/spinner/spinner';

export default function PlayerPage(): JSX.Element {
  const filmId = useFilmIdFromUrl();
  const film = useFilmData(filmId);
  if(film === undefined) {
    return <Spinner />;
  }
  if(film === null) {
    return <Error404 />;
  }
  return (
    <Routes>
      <Route index
        element={<Player title={film.name} videoLink={film.videoLink}/>}
      />
    </Routes>
  );
}

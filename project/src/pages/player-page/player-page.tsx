import Player from '../../components/player/player';
import Error404 from '../error-404/error-404';
import { Route, Routes } from 'react-router-dom';
import { useFilmData, useFilmIdFromUrl } from '../../hooks';

export default function PlayerPage(): JSX.Element {
  const filmId = useFilmIdFromUrl();
  const film = useFilmData(filmId);
  if(!film) {
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

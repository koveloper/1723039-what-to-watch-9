import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { State } from '../../store/types';
import { AppRoute } from '../../utils/constants';
import Player from '../../components/player/player';

function PlayerPage(): JSX.Element {
  const films = useSelector((state: State) => state.films.films) || [];
  const params = useParams();
  const film = films.find((m) => `${m.id}` === params.id);
  if(!film) {
    return (
      <Navigate to={AppRoute.Err404}></Navigate>
    );
  }
  return (
    <Routes>
      <Route index
        element={<Player title={film.name} videoLink={film.videoLink}/>}
      />
    </Routes>
  );
}

export default PlayerPage;

import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { FilmDataType } from '../../types/film-data-type';
import { AppRoute } from '../../utils/constants';
import Player from './player-page';

type PlayerPageProps = {
    films: FilmDataType[];
}

function PlayerPageWrapper(props: PlayerPageProps): JSX.Element {
  const params = useParams();
  const film = props.films.find((m) => `${m.id}` === params.id);
  if(!film) {
    return (
      <Navigate to={AppRoute.Err404}></Navigate>
    );
  }
  return (
    <Routes>
      <Route index
        element={<Player title={film.name} duration={film.runTime} progress={20} videoLink={film.videoLink}/>}
      />
    </Routes>
  );
}

export default PlayerPageWrapper;

import MainPage from '../main-page/main-page';
import PlayerPageWrapper from '../player-page/player-page-wrapper';
import UserListPage from '../user-list-page/user-list-page';
import SignInPage from '../sign-in-page/sign-in-page';
import Error404 from '../error-404/error-404';
import AuthWrapper from '../../components/auth-wrapper/auth-wrapper';
import FilmsWrapper from './films-wrapper';
import Spinner from '../../components/spinner/spinner';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';

function App(): JSX.Element {
  const {films, promoFilm} = useSelector((state: State) => state.films);
  if(films === null || promoFilm === null) {
    return <Spinner/>;
  }
  return (
    <Routes>
      <Route path={AppRoute.Root}
        element={<MainPage />}
      />
      <Route path={AppRoute.SignIn}
        element={<SignInPage />}
      />
      <Route path={AppRoute.User}
        element={<AuthWrapper component={<UserListPage favorites={films.slice(0, 8)}/>}/>}
      />
      <Route path={AppRoute.Film}
        element={<FilmsWrapper />}
      />
      <Route path={AppRoute.Player}
        element={<PlayerPageWrapper films={films} />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;

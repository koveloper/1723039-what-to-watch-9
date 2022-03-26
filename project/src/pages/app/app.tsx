import MainPage from '../main-page/main-page';
import PlayerPage from '../player-page/player-page';
import UserListPage from '../user-list-page/user-list-page';
import SignInPage from '../sign-in-page/sign-in-page';
import Error404 from '../error-404/error-404';
import AuthWrapper from '../../components/auth-wrapper/auth-wrapper';
import MoviePageRouter from '../movie-page-router/movie-page-router';
import Spinner from '../../components/spinner/spinner';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { useFilms, usePromoFilm, useRedirectCheck } from '../../hooks';

export default function App(): JSX.Element {
  const films = useFilms();
  const promoFilm = usePromoFilm();
  useRedirectCheck();
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
        element={<AuthWrapper component={<UserListPage/>}/>}
      />
      <Route path={AppRoute.Film}
        element={<MoviePageRouter />}
      />
      <Route path={AppRoute.Player}
        element={<PlayerPage />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

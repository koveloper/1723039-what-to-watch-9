import MainPage from '../main-page/main-page';
import PlayerPageWrapper from '../player-page/player-page-wrapper';
import UserListPage from '../user-list-page/user-list-page';
import SignInPage from '../sign-in-page/sign-in-page';
import Error404 from '../error-404/error-404';
import AuthWrapper from '../../components/auth-wrapper/auth-wrapper';
import Films from './films';
import { FilmDataType } from '../../types/film-data-type';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { FilmReviewType } from '../../types/film-review-type';

type AppProps = {
  promoFilm: FilmDataType,
  filmsGallery: FilmDataType[],
  reviews: FilmReviewType[]
}

function App(props: AppProps): JSX.Element {
  const genres: {[index: string]: string} = props.filmsGallery.reduce((prev, curr) => Object.assign(prev, {[curr.genre]: curr.genre}), {});
  return (
    <Routes>
      <Route path={AppRoute.Root}
        element={<MainPage genres={Object.values(genres)} filmsGallery={props.filmsGallery} promoFilm={props.promoFilm}/>}
      />
      <Route path={AppRoute.SignIn}
        element={<SignInPage />}
      />
      <Route path={AppRoute.User}
        element={<AuthWrapper isLoggedIn={false} component={<UserListPage username='user' favorites={props.filmsGallery.slice(0, 8)}/>}/>}
      />
      <Route path={AppRoute.Film}
        element={<Films films={props.filmsGallery} reviews={props.reviews}></Films>}
      />
      <Route path={AppRoute.Player}
        element={<PlayerPageWrapper films={props.filmsGallery} />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;

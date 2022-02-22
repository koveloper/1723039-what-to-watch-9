import MainPage from '../main-page/main-page';
import Player from '../player-page/player-page';
import AddReviewPage from '../add-review-page/add-review-page';
import MoviePage from '../movie-page/movie-page';
import UserListPage from '../user-list-page/user-list-page';
import SignInPage from '../sign-in-page/sign-in-page';
import Error404 from '../error-404/error-404';
import AuthWrapper from '../../components/auth-wrapper/auth-wrapper';
import { FilmDataType } from '../../types/film-data-type';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { FilmReviewType } from '../../types/film-review-type';
import { reviews } from '../../mock/films';

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
      <Route path={AppRoute.SignIn} element={<SignInPage />} />
      <Route path={AppRoute.User}
        element={<AuthWrapper isLoggedIn={false} component={<UserListPage username='user' favorites={props.filmsGallery.slice(0, 8)}/>}/>}
      />
      <Route path={AppRoute.Film}
        element={<MoviePage film={props.filmsGallery[0]} reviews={reviews.slice(0, 5)} otherFilms={props.filmsGallery.slice(0, 4)} />}
      />
      <Route path={AppRoute.AddReview} element={<AddReviewPage {...props.filmsGallery[0]} />} />
      <Route path={AppRoute.Player} element={<Player progress={30} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;

import MainPage from '../main-page/main-page';
import Player from '../player-page/player-page';
import AddReviewPage from '../add-review-page/add-review-page';
import MoviePage from '../movie-page/movie-page';
import UserListPage from '../user-list-page/user-list-page';
import SignInPage from '../sign-in-page/sign-in-page';
import Error404 from '../error-404/error-404';
import AuthWrapper from '../../components/auth-wrapper/auth-wrapper';
import { FilmDataProps } from '../../types/film-data-type';
import { filmDataMock } from '../../mock/film-card-data';
import { favoriteFilmsListMock, filmsListMock, reducedFilmsListMock } from '../../mock/films-list';
import { genresMock } from '../../mock/genres';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, FilmInfoType } from '../../utils/constants';

const filmData: FilmDataProps = filmDataMock;

const pages = {
  main: <MainPage genres={genresMock} filmData={filmData} filmsGallery={filmsListMock} />,
  player: <Player progress={30} />,
  addReview: <AddReviewPage {...filmData} />,
  moviePage: <MoviePage selectedTab={FilmInfoType.Overview} film={filmData} otherFilms={reducedFilmsListMock} />,
  userListPage: <UserListPage username='user' favorites={favoriteFilmsListMock}/>,
  authWrapper: <AuthWrapper isLoggedIn={false} component={<UserListPage username='user' favorites={favoriteFilmsListMock}/>} />,
  signIn: <SignInPage />,
  error404: <Error404 />,
};

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root} element={pages.main} />
      <Route path={AppRoute.SignIn} element={pages.signIn} />
      <Route path={AppRoute.User}
        element={<AuthWrapper isLoggedIn={false} component={pages.userListPage}/>}
      />
      <Route path={AppRoute.Film} element={pages.moviePage} />
      <Route path={AppRoute.AddReview} element={pages.addReview} />
      <Route path={AppRoute.Player} element={pages.player} />
      <Route path="*" element={pages.error404} />
    </Routes>
  );
}

export default App;

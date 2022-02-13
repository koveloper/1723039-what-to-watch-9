import MainPage from '../main-page/main-page';
import Player from '../player/player';
import AddReviewPage from '../add-review-page/add-review-page';
import MoviePage from '../movie-page/moview-page';
import UserListPage from '../user-list-page/user-list-page';
import SignInPage from '../sign-in-page/sign-in-page';
import { FilmDataProps } from '../../types/film-data-type';
import { filmDataMock } from '../../mock/film-card-data';
import { favoriteFilmsListMock, filmsListMock, reducedFilmsListMock } from '../../mock/films-list';
import { genresMock } from '../../mock/genres';

const filmData: FilmDataProps = filmDataMock;

const pages = {
  main: <MainPage genres={genresMock} filmData={filmData} filmsGallery={filmsListMock} />,
  player: <Player progress={30} />,
  addReview: <AddReviewPage {...filmData} />,
  moviePage: <MoviePage selectedTab="overview" film={filmData} otherFilms={reducedFilmsListMock} />,
  userListPage: <UserListPage username='user' favorites={favoriteFilmsListMock}/>,
  signIn: <SignInPage message='ksafkahsdkjhasd' isError/>,
};

function App(): JSX.Element {
  return pages.main;
}

export default App;

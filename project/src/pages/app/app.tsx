import MainPage from '../main-page/main-page';
import PlayerPageWrapper from '../player-page/player-page-wrapper';
import UserListPage from '../user-list-page/user-list-page';
import SignInPage from '../sign-in-page/sign-in-page';
import Error404 from '../error-404/error-404';
import AuthWrapper from '../../components/auth-wrapper/auth-wrapper';
import FilmsWrapper from './films-wrapper';
import Spinner from '../../components/spinner/spinner';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ALL_GENRES, AppRoute, FILMS_ON_PAGE_INITIAL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../../store/types';
import { resetShownFilmsCount } from '../../store/action';
import { filterFilmsByGenre, getGenresFromFilms } from './utils';

function App(): JSX.Element {
  const films = useSelector((state: State) => state.films);
  const genre = useSelector((state: State) => state.genre);
  const promoFilm = useSelector((state: State) => state.promoFilm);
  const dispatch = useDispatch<AppDispatch>();
  const filmsOnPage = useSelector((state: State) => state.maxFilmsOnPage);
  const location = useLocation();
  if(films === null || promoFilm === null) {
    return <Spinner/>;
  }
  const genres: string[] = [ALL_GENRES, ...getGenresFromFilms(films)];
  const filmsByGenre = filterFilmsByGenre(films, genre);
  if(location.pathname !== AppRoute.Root && filmsOnPage !== FILMS_ON_PAGE_INITIAL) {
    dispatch(resetShownFilmsCount());
  }
  return (
    <Routes>
      <Route path={AppRoute.Root}
        element={<MainPage films={filmsByGenre} genres={Object.values(genres)} promoFilm={promoFilm}/>}
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

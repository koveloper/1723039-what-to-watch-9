import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { store } from '../../store';
import { setComments, setFilmsLikeSelected, setSelectedFilm } from '../../store/action';
import { State } from '../../store/types';
import { AppRoute } from '../../utils/constants';
import Spinner from '../../components/spinner/spinner';
import AddReviewPage from '../add-review-page/add-review-page';
import Error404 from '../error-404/error-404';
import MoviePage from '../movie-page/movie-page';

function FilmsWrapper(): JSX.Element {
  const params = useParams();
  const selectedFilm = useSelector((state: State) => state.selectedFilm);
  const selectedFilmId = +(params.id || 0);
  const filmsLikeSelected = useSelector((state: State) => state.filmsLikeSelected);
  const comments = useSelector((state: State) => state.comments);
  if(selectedFilm && selectedFilm.id !== selectedFilmId) {
    store.dispatch(setSelectedFilm(undefined));
    store.dispatch(setFilmsLikeSelected(null));
    store.dispatch(setComments(null));
    return <Spinner />;
  }
  if(selectedFilm === undefined) {
    api.fetchSelectedFilm(selectedFilmId);
    return <Spinner />;
  }
  if(selectedFilm === null) {
    return (
      <Navigate to={AppRoute.Err404}></Navigate>
    );
  }
  if(!filmsLikeSelected) {
    api.fetchSimilarFilms(selectedFilmId);
    return <Spinner />;
  }
  if(!comments) {
    api.fetchComments(selectedFilmId);
    return <Spinner />;
  }
  return (
    <Routes>
      <Route index
        element={<MoviePage film={selectedFilm} comments={comments} similarFilms={filmsLikeSelected.slice(0, 4)} />}
      />
      <Route path='review' element={<AddReviewPage {...selectedFilm} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default FilmsWrapper;

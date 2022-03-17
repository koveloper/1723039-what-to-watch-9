import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { store } from '../../store';
import { State } from '../../store/types';
import { AppRoute } from '../../utils/constants';
import Spinner from '../../components/spinner/spinner';
import AddReviewPage from '../add-review-page/add-review-page';
import Error404 from '../error-404/error-404';
import MoviePage from '../movie-page/movie-page';
import { resetSelectedFilm } from '../../store/selected-film-process/selected-film-process';

function FilmsWrapper(): JSX.Element {
  const params = useParams();
  const {filmData, filmsLikeSelected, comments} = useSelector((state: State) => state.selectedFilm);
  const selectedFilmId = +(params.id || 0);
  if(filmData && filmData.id !== selectedFilmId) {
    store.dispatch(resetSelectedFilm());
    return <Spinner />;
  }
  if(!filmData) {
    api.fetchSelectedFilm(selectedFilmId);
  }
  if(!filmsLikeSelected) {
    api.fetchSimilarFilms(selectedFilmId);
  }
  if(!comments) {
    api.fetchComments(selectedFilmId);
  }
  if(filmData === null) {
    return (
      <Navigate to={AppRoute.Err404}></Navigate>
    );
  }
  if(!filmData || !comments || !filmsLikeSelected) {
    return <Spinner />;
  }
  return (
    <Routes>
      <Route index
        element={<MoviePage film={filmData} comments={comments} similarFilms={filmsLikeSelected.slice(0, 4)} />}
      />
      <Route path='review' element={<AddReviewPage {...filmData} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default FilmsWrapper;

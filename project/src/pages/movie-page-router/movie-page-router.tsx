import Spinner from '../../components/spinner/spinner';
import AddReviewPage from '../add-review-page/add-review-page';
import Error404 from '../error-404/error-404';
import MoviePage from '../movie-page/movie-page';
import { api } from '../../api/api';
import { useFilmIdFromUrl, useFullFilmData } from '../../hooks';
import { Route, Routes } from 'react-router-dom';

export default function MoviePageRouter(): JSX.Element {
  const id = useFilmIdFromUrl();
  const film = useFullFilmData(id);
  if(film === undefined) {
    api.fetchFilmFullData(id);
    return <Spinner />;
  }
  return (
    <Routes>
      <Route index
        element={<MoviePage film={film.data} comments={film.comments} similarFilms={film.similar} />}
      />
      <Route path='review' element={<AddReviewPage {...film.data} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

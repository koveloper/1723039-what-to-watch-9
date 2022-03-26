import Spinner from '../../components/spinner/spinner';
import AddReviewPage from '../add-review-page/add-review-page';
import Error404 from '../error-404/error-404';
import MoviePage from '../movie-page/movie-page';
import { api } from '../../api/api';
import { Route, Routes } from 'react-router-dom';
import { useFilmIdFromUrl } from '../../hooks/use-film-id-from-url';
import { useFullFilmData } from '../../hooks/use-full-film-data';

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
        element={
          <MoviePage
            film={film.data}
            comments={film.comments}
            similarFilms={film.similar}
          />
        }
      />
      <Route path='review' element={
        <AddReviewPage
          id={film.data.id}
          backgroundImage={film.data.backgroundImage}
          posterImage={film.data.posterImage}
          name={film.data.name}
        />
      }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

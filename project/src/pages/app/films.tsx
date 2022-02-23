import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { FilmDataType } from '../../types/film-data-type';
import { FilmReviewType } from '../../types/film-review-type';
import { AppRoute } from '../../utils/constants';
import AddReviewPage from '../add-review-page/add-review-page';
import Error404 from '../error-404/error-404';
import MoviePage from '../movie-page/movie-page';

type FilmsProps = {
    films: FilmDataType[];
    reviews: FilmReviewType[];
}

function Films(props: FilmsProps): JSX.Element {
  const params = useParams();
  const film = props.films.find((m) => `${m.id}` === params.id);
  if(!film) {
    return (
      <Navigate to={AppRoute.Err404}></Navigate>
    );
  }
  const reviews = props.reviews.filter((r) => `${r.id}`  === params.id);
  const suchGenreFilms = props.films.filter((m)=> (film.genre === m.genre && film.id !== m.id)).slice(0, 4);
  return (
    <Routes>
      <Route index
        element={<MoviePage film={film} reviews={reviews.slice(0, 5)} otherFilms={suchGenreFilms} />}
      />
      <Route path='review' element={<AddReviewPage {...film} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default Films;

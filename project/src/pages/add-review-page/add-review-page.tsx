import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Header from '../../components/header/header';
import { FilmData } from '../../types/film-data-type';
import { AppRoute, PosterSize } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { api } from '../../api/api';
import { HeaderType } from '../../components/header/header-type';
import { useFilmIdFromUrl } from '../../hooks/use-film-id-from-url';
import { useAuth } from '../../hooks/use-auth';
import { useRedirect } from '../../hooks/use-redirect';

export default function AddReviewPage(props: FilmData): JSX.Element {
  const filmId = useFilmIdFromUrl();
  const isAuthorized = useAuth();
  const redirect = useRedirect();
  if(!isAuthorized) {
    redirect(`${AppRoute.Films}/${filmId}`);
  }
  const addReviewSubmitHandler = (rating: number, commentary: string) => {
    if(!commentary.length) {
      return;
    }
    const comment = {
      id: filmId,
      comment: commentary,
      rating,
    };
    api.postReview(comment);
  };
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={props.backgroundImage} alt={props.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header type={HeaderType.AddReview}>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to=".." className="breadcrumbs__link">{props.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="." className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <UserBlock/>
        </Header>
        <FilmCardPoster
          title={props.name}
          posterUrl={props.posterImage}
          size={PosterSize.Small}
        />
      </div>
      <AddReviewForm onReviewSubmit={addReviewSubmitHandler}/>
    </section>
  );
}

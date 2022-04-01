import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import { AppError, AppRoute, PosterSize } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { HeaderType } from '../../components/header/header-type';
import { useAuth } from '../../hooks/use-auth';
import { useEffect, useState } from 'react';
import { useAppError } from '../../hooks/use-app-error';

type AddReviewPageProps = {
  id: number;
  name: string;
  backgroundImage: string;
  posterImage: string;
};

export default function AddReviewPage(props: AddReviewPageProps): JSX.Element | null {
  const isAuthorized = useAuth();
  const navigate = useNavigate();
  const [isPosting, setPosting] = useState(false);
  const [appError] = useAppError();
  useEffect(() => {
    if(isPosting && appError && appError.type === AppError.PostReview) {
      setPosting(false);
    }
    if(!isAuthorized) {
      navigate(AppRoute.SignIn);
    }
  }, [appError, isAuthorized, isPosting]);
  const handleReviewSubmit = (rating: number, commentary: string) => {
    if(!commentary.length) {
      return;
    }
    const comment = {
      id: props.id,
      comment: commentary,
      rating,
    };
    setPosting(true);
    api.postReview(comment);
  };
  return (
    <section className="film-card film-card--full">
      {
        isPosting
          ? <Spinner />
          : null
      }
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={props.backgroundImage} alt={props.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header type={HeaderType.AddReview}>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${props.id}`} className="breadcrumbs__link">{props.name}</Link>
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
      <AddReviewForm onReviewSubmit={handleReviewSubmit}/>
    </section>
  );
}

import FilmCardBackground from '../../components/film-card-background/film-card-background';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import HeaderLayout from '../../layouts/header-layout/header-layout';
import Breadcumbs from '../../layouts/header-layout/breadcumbs';
import { FilmData } from '../../types/film-data-type';
import { AppRoute, PosterSize } from '../../utils/constants';
import { HeaderType } from '../../layouts/header-layout/header-type';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { useAuth, useFilmIdFromUrl } from '../../hooks';

export default function AddReviewPage(props: FilmData): JSX.Element {
  const filmId = useFilmIdFromUrl();
  const navigate = useNavigate();
  const isAuthorized = useAuth();
  useEffect(() => {
    if(!isAuthorized) {
      navigate(`${AppRoute.Films}/${filmId}`);
    }
  }, [isAuthorized]);
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
        <FilmCardBackground title={props.name} imageUrl={props.backgroundImage}/>
        <h1 className="visually-hidden">WTW</h1>
        <HeaderLayout type={HeaderType.AddReview}>
          <Breadcumbs>{props.name}</Breadcumbs>
          <UserBlock/>
        </HeaderLayout>
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

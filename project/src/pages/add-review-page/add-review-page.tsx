import { FilmDataType } from '../../types/film-data-type';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import HeaderLayout from '../../layouts/header-layout/header-layout';
import { AppRoute, PosterSize } from '../../utils/constants';
import { HeaderType } from '../../layouts/header-layout/header-type';
import Breadcumbs from '../../layouts/header-layout/breadcumbs';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';
import { useEffect } from 'react';
import { AuthStatus } from '../../store/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { store } from '../../store';
import { setUserComment } from '../../store/action';

function AddReviewPage(props: FilmDataType): JSX.Element {
  const params = useParams();
  const selectedFilmId = +(params.id || 0);
  const authStatus = useSelector((state: State) => state.authStatus);
  const userComment = useSelector((state: State) => state.userComment);
  const navigate = useNavigate();
  useEffect(() => {
    if(authStatus !== AuthStatus.Authorized) {
      navigate(`${AppRoute.Films}/${selectedFilmId}`);
    }
    if(userComment) {
      navigate(`${AppRoute.Films}/${selectedFilmId}`);
    }
  }, [authStatus, userComment]);
  const addReviewSubmitHandler = (rating: number, commentary: string) => {
    if(!commentary.length) {
      return;
    }
    const comment = {
      id: selectedFilmId,
      comment: commentary,
      rating,
    };
    store.dispatch(setUserComment(undefined));
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

export default AddReviewPage;

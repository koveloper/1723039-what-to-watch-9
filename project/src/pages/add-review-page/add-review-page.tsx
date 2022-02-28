import { FilmDataType } from '../../types/film-data-type';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import HeaderLayout from '../../layouts/header-layout/header-layout';
import { PosterSize } from '../../utils/constants';
import { HeaderType } from '../../layouts/header-layout/header-type';
import Breadcumbs from '../../layouts/header-layout/breadcumbs';

function AddReviewPage(props: FilmDataType): JSX.Element {
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
      <AddReviewForm />
    </section>
  );
}

export default AddReviewPage;

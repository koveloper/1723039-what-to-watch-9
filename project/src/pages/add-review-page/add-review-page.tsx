import { FilmDataProps } from '../../types/film-data-type';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import HeaderLayout from '../../layouts/header-layout/header-layout';
import { PosterSize } from '../../utils/constants';

function AddReviewPage(props: FilmDataProps): JSX.Element {
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <FilmCardBackground title={props.title} imageUrl={props.backgroundImageUrl}/>
        <h1 className="visually-hidden">WTW</h1>
        <HeaderLayout title={props.title}>
          <UserBlock/>
        </HeaderLayout>
        <FilmCardPoster
          title={props.title}
          posterUrl={props.posterImageUrl}
          size={PosterSize.Small}
        />
      </div>
      <AddReviewForm />
    </section>
  );
}

export default AddReviewPage;

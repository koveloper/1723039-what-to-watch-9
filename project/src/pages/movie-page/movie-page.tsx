import { useAuth, useButtonsDefaultHandler, useFavorite } from '../../hooks';
import { HeaderType } from '../../layouts/header-layout/header-type';
import { Comments } from '../../types/commentary';
import { FilmData } from '../../types/film-data-type';
import { PosterSize } from '../../utils/constants';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import FilmCardMain from '../../components/film-card-main/film-card-main';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmsList from '../../components/films-list/films-list';
import UserBlock from '../../components/user-block/user-block';
import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import FilmDescriptionLayout from '../../layouts/film-description-layout/film-description-layout';
import HeaderLayout from '../../layouts/header-layout/header-layout';

type MoviePageProps = {
  film: FilmData;
  comments: Comments;
  similarFilms: FilmData[];
}

export default function MoviePage(props: MoviePageProps): JSX.Element {
  const isAuthorized = useAuth();
  const actionButtonClickHandler = useButtonsDefaultHandler(props.film.id);
  const isFavorite = useFavorite(props.film.id);

  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className="film-card__bg">
            <img src={props.film.backgroundImage} alt={props.film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <HeaderLayout type={HeaderType.FilmCard}>
            <UserBlock />
          </HeaderLayout>
          <div className="film-card__wrap">
            <div className="film-card__info">
              <FilmCardMain
                title={props.film.name}
                genre={props.film.genre}
                releaseYear={props.film.released}
              >
                <FilmCardButtons
                  onButtonClick={actionButtonClickHandler}
                  isShowAddReviewButton={isAuthorized}
                  isShowAddToFavorsButton={isAuthorized}
                  isFavorite={isFavorite}
                />
              </FilmCardMain>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <FilmCardPoster
              posterUrl={props.film.posterImage}
              title={props.film.name}
              size={PosterSize.Big}
            />
            <FilmDescriptionLayout film={props.film} comments={props.comments} />
          </div>
        </div>
      </section>
      <CatalogLayout title='More like this' type='filtered'>
        <FilmsList films={props.similarFilms} />
      </CatalogLayout>
    </>
  );
}

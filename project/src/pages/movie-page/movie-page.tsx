import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmsList from '../../components/films-list/films-list';
import FilmCardOverview from '../../components/film-card-overview/film-card-overview';
import FilmCardDetails from '../../components/film-card-details/film-card-details';
import FilmCardReviews from '../../components/film-card-reviews/film-card-reviews';
import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import FilmDescriptionLayout from '../../layouts/film-description-layout/film-description-layout';
import { MoviePageProps } from '../../types/moview-page-type';
import { FilmInfoType, PosterSize } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

function MoviewPage(props: MoviePageProps): JSX.Element {
  const url = useLocation();
  let displayElement: JSX.Element = <FilmCardOverview key='film-overview' {...props.film} />;
  switch(url.hash) {
    case `#${FilmInfoType.Details}`:
      displayElement = <FilmCardDetails {...props.film}/>;
      break;
    case `#${FilmInfoType.Reviews}`:
      displayElement = <FilmCardReviews reviews={props.film.reviews}/>;
      break;
    default:
      break;
  }
  return (
    <>
      <FilmCardLayout {...props.film}>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <FilmCardPoster
              posterUrl={props.film.posterImageUrl}
              title={props.film.title}
              size={PosterSize.Big}
            />
            <FilmDescriptionLayout>
              {displayElement}
            </FilmDescriptionLayout>
          </div>
        </div>
      </FilmCardLayout>
      <CatalogLayout>
        <FilmsList films={props.otherFilms}/>
      </CatalogLayout>
    </>
  );
}

export default MoviewPage;

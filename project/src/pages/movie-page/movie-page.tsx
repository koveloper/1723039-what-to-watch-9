import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmsList from '../../components/films-list/films-list';
import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import FilmDescriptionLayout from '../../layouts/film-description-layout/film-description-layout';
import { MoviePageProps } from '../../types/moview-page-type';
import { PosterSize } from '../../utils/constants';

function MoviewPage(props: MoviePageProps): JSX.Element {
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
            <FilmDescriptionLayout film={props.film} />
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

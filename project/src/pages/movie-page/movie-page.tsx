import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmsList from '../../components/films-list/films-list';
import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import FilmDescriptionLayout from '../../layouts/film-description-layout/film-description-layout';
import { Comments } from '../../types/commentary';
import { FilmDataType } from '../../types/film-data-type';
import { PosterSize } from '../../utils/constants';

type MoviePageProps = {
  film: FilmDataType;
  comments: Comments;
  similarFilms: FilmDataType[];
}

function MoviePage(props: MoviePageProps): JSX.Element {
  return (
    <>
      <FilmCardLayout film={props.film} type='full'>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <FilmCardPoster
              posterUrl={props.film.posterImage}
              title={props.film.name}
              size={PosterSize.Big}
            />
            <FilmDescriptionLayout film={props.film} comments={props.comments}/>
          </div>
        </div>
      </FilmCardLayout>
      <CatalogLayout title='More like this' type='filtered'>
        <FilmsList films={props.similarFilms}/>
      </CatalogLayout>
    </>
  );
}

export default MoviePage;

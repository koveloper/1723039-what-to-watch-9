import FilmCardMain from '../film-card-main/film-card-main';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import { FilmDataProps } from '../../types/film-data-type';
import { PosterSize } from '../../utils/constants';

function FilmCardContent(props: FilmDataProps): JSX.Element {
  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <FilmCardPoster
          title={props.title}
          posterUrl={props.posterImageUrl}
          size={PosterSize.Medium}
        />
        <FilmCardMain
          title={props.title}
          genre={props.genre}
          releaseYear={props.releaseYear}
          showAddReviewButton={false}
        />
      </div>
    </div>
  );
}

export default FilmCardContent;

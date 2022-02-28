import FilmCardMain from '../film-card-main/film-card-main';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import { FilmDataType } from '../../types/film-data-type';
import { PosterSize } from '../../utils/constants';

function FilmCardContent(props: FilmDataType): JSX.Element {
  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <FilmCardPoster
          title={props.name}
          posterUrl={props.posterImage}
          size={PosterSize.Medium}
        />
        <FilmCardMain
          id={props.id}
          title={props.name}
          genre={props.genre}
          releaseYear={props.released}
          showAddReviewButton={false}
        />
      </div>
    </div>
  );
}

export default FilmCardContent;

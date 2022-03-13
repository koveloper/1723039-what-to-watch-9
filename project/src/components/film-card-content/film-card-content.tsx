import FilmCardMain from '../film-card-main/film-card-main';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import { FilmDataType } from '../../types/film-data-type';
import { PosterSize } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';
import { AuthStatus } from '../../store/constants';

function FilmCardContent(props: FilmDataType): JSX.Element {
  const authStatus = useSelector((state: State) => state.authStatus);
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
          showAddToFavorsButton={authStatus === AuthStatus.Authorized}
        />
      </div>
    </div>
  );
}

export default FilmCardContent;

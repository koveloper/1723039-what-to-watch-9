import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { AppRoute } from '../../utils/constants';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';

type FilmCardMainProps = {
  id: number;
  title: string;
  genre: string;
  releaseYear: number;
  isShowAddReviewButton: boolean;
  isShowAddToFavorsButton: boolean;
  isFavorite: boolean;
}

function FilmCardMain(props: FilmCardMainProps): JSX.Element {
  const navigate = useNavigate();
  const playButtonClickHandler = () => {
    navigate(AppRoute.Player.replace(':id', `${props.id}`));
  };
  const addToFavorButtonClickHandler = () => {
    api.setFavoriteStatus(props.id, !props.isFavorite);
  };
  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">{props.title}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{props.genre}</span>
        <span className="film-card__year">{props.releaseYear}</span>
      </p>

      <FilmCardButtons
        onPlayButtonClick={playButtonClickHandler}
        onAddToFavorButtonClick={addToFavorButtonClickHandler}
        isShowAddReviewButton={props.isShowAddReviewButton}
        isShowAddToFavorsButton={props.isShowAddToFavorsButton}
        isFavorite={props.isFavorite}
      />
    </div>
  );
}

export default FilmCardMain;

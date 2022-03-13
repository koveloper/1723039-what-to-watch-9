import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';

type FilmCardMainProps = {
  id: number;
  title: string;
  genre: string;
  releaseYear: number;
  showAddReviewButton: boolean;
  showAddToFavorsButton: boolean;
}

function FilmCardMain(props: FilmCardMainProps): JSX.Element {
  const navigate = useNavigate();
  const playButtonClickHandler = () => navigate(AppRoute.Player.replace(':id', `${props.id}`));
  const addToFavorButtonClickHandler = () => {navigate(AppRoute.User);};
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
        isShowAddReviewButton={props.showAddReviewButton}
        isShowAddToFavorsButton={props.showAddToFavorsButton}
      />
    </div>
  );
}

export default FilmCardMain;

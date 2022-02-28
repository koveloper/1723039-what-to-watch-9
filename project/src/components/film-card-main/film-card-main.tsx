import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';

type FilmCardMainProps = {
  id: number;
  title: string;
  genre: string;
  releaseYear: number;
  showAddReviewButton: boolean;
}

function FilmCardMain({id, title, genre, releaseYear, showAddReviewButton}: FilmCardMainProps): JSX.Element {
  const navigate = useNavigate();
  const playButtonClickHandler = () => navigate(AppRoute.Player.replace(':id', `${id}`));
  const addToFavorButtonClickHandler = () => {navigate(AppRoute.User);};
  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">{title}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{genre}</span>
        <span className="film-card__year">{releaseYear}</span>
      </p>

      <FilmCardButtons
        onPlayButtonClick={playButtonClickHandler}
        onAddToFavorButtonClick={addToFavorButtonClickHandler}
        isShowAddReviewButton={showAddReviewButton}
      />
    </div>
  );
}

export default FilmCardMain;

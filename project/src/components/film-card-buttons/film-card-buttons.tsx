import { Link } from 'react-router-dom';

type FilmCardButtonsProps = {
  isShowAddReviewButton: boolean;
  onPlayButtonClick: () => void;
  onAddToFavorButtonClick: () => void;
}

function FilmCardButtons(props: FilmCardButtonsProps): JSX.Element {
  return (
    <div className="film-card__buttons">
      <button onClick={() => props.onPlayButtonClick()} className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button onClick={() => props.onAddToFavorButtonClick()} className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
      </button>
      {props.isShowAddReviewButton ? <Link to="review" className="btn film-card__button">Add review</Link> : null}
    </div>
  );
}

export default FilmCardButtons;

import FilmCardButtons from '../film-card-buttons/film-card-buttons';

function FilmCardMain({title, genre, releaseYear, showAddReviewButton}: {
    title: string;
    genre: string;
    releaseYear: number;
    showAddReviewButton: boolean;
  }): JSX.Element {
  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">{title}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{genre}</span>
        <span className="film-card__year">{releaseYear}</span>
      </p>

      <FilmCardButtons showAddReviewButton={showAddReviewButton}/>
    </div>
  );
}

export default FilmCardMain;

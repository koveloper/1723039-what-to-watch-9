function FilmCardRating({score, ratingLevel, ratingCount}: {
  score: number;
  ratingLevel: string;
  ratingCount: number;
}): JSX.Element {
  return (
    <div className="film-rating">
      <div className="film-rating__score">{score}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{ratingLevel}</span>
        <span className="film-rating__count">{ratingCount} ratings</span>
      </p>
    </div>
  );
}

export default FilmCardRating;

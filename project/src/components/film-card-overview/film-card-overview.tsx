const getDescriptionItem = (descr: string, key: string): JSX.Element => (
  <p key={key}>{descr}</p>
);

function FilmCardOverview({description, director, actors}: {
  description: string[],
  director: string,
  actors: string[]
}): JSX.Element {
  return (
    <div className="film-card__text">
      {description.map((descr, i) => getDescriptionItem(descr, `film-descr-${i}`))}
      <p className="film-card__director"><strong>Director: {director}</strong></p>
      <p className="film-card__starring"><strong>Starring: {actors.join(', ')} and other</strong></p>
    </div>
  );
}

export default FilmCardOverview;

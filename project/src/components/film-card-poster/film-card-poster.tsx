import { PosterSize } from '../../utils/constants';

const getClasses = (type: PosterSize): string => {
  switch(type) {
    case PosterSize.Big: return 'film-card__poster film-card__poster--big';
    case PosterSize.Medium: return 'film-card__poster';
    case PosterSize.Small: return 'film-card__poster film-card__poster--small';
  }
};

function FilmCardPoster({size, posterUrl, title}: {
  size: PosterSize;
  posterUrl: string;
  title: string;
}): JSX.Element {
  return (
    <div className={getClasses(size)}>
      <img src={posterUrl} alt={title} width="218" height="327" />
    </div>
  );
}

export default FilmCardPoster;

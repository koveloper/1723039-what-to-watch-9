import { PosterSize } from '../../utils/constants';

const classes = {
  [PosterSize.Big]: 'film-card__poster film-card__poster--big',
  [PosterSize.Medium]: 'film-card__poster',
  [PosterSize.Small]: 'film-card__poster film-card__poster--small',
};

function FilmCardPoster({size, posterUrl, title}: {
  size: PosterSize;
  posterUrl: string;
  title: string;
}): JSX.Element {
  return (
    <div className={classes[size]}>
      <img src={posterUrl} alt={title} width="218" height="327" />
    </div>
  );
}

export default FilmCardPoster;

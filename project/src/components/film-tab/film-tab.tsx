import { Comments } from '../../types/commentary';
import { FilmData } from '../../types/film-data-type';
import { FilmInfoType } from '../../utils/constants';
import FilmCardDetails from '../film-card-details/film-card-details';
import FilmCardOverview from '../film-card-overview/film-card-overview';
import FilmCardReviews from '../film-card-reviews/film-card-reviews';

type FilmTabProps = {
    film: FilmData;
    comments: Comments;
    tab: FilmInfoType;
}

export default function FilmTab({film, comments, tab} : FilmTabProps):JSX.Element | null {
  switch(tab) {
    case FilmInfoType.Overview:
      return (
        <FilmCardOverview
          description={film.description}
          director={film.director}
          rating={film.rating}
          scoresCount={film.scoresCount}
          starring={film.starring}
        />
      );
    case FilmInfoType.Details:
      return (
        <FilmCardDetails
          director={film.director}
          genre={film.genre}
          released={film.released}
          runTime={film.runTime}
          starring={film.starring}
        />
      );
    case FilmInfoType.Reviews:
      return <FilmCardReviews comments={comments} />;
    default:
      return null;
  }
}

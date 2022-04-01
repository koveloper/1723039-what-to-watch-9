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

function FilmTab({film, comments, tab} : FilmTabProps):JSX.Element | null {
  switch(tab) {
    case FilmInfoType.Overview:
      return (
        <FilmCardOverview
          film={film}
        />
      );
    case FilmInfoType.Details:
      return (
        <FilmCardDetails
          film={film}
        />
      );
    case FilmInfoType.Reviews:
      return <FilmCardReviews comments={comments} />;
    default:
      return null;
  }
}

export default FilmTab;

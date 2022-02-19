import FilmCardMenu from '../../components/film-card-menu/film-card-menu';
import FilmCardOverview from '../../components/film-card-overview/film-card-overview';
import FilmCardDetails from '../../components/film-card-details/film-card-details';
import FilmCardReviews from '../../components/film-card-reviews/film-card-reviews';
import { FilmInfoType } from '../../utils/constants';
import { FilmDataProps } from '../../types/film-data-type';
import { useState } from 'react';

type FilmInfoLayoutProps = {
  film: FilmDataProps;
}

function FilmInfoLayout({film}: FilmInfoLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmInfoType.Overview);
  return (
    <div className="film-card__desc">
      <FilmCardMenu onTabSelect={(tab: FilmInfoType) => setActiveTab(tab)}/>
      {
        (activeTab === FilmInfoType.Overview && <FilmCardOverview {...film} />)
        || (activeTab === FilmInfoType.Details && <FilmCardDetails {...film} />)
        || (activeTab === FilmInfoType.Reviews && <FilmCardReviews reviews={film.reviews} />)
      }
    </div>
  );
}

export default FilmInfoLayout;

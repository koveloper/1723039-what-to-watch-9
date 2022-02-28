import FilmCardMenu from '../../components/film-card-menu/film-card-menu';
import FilmCardOverview from '../../components/film-card-overview/film-card-overview';
import FilmCardDetails from '../../components/film-card-details/film-card-details';
import FilmCardReviews from '../../components/film-card-reviews/film-card-reviews';
import { FilmInfoType } from '../../utils/constants';
import { FilmDataType } from '../../types/film-data-type';
import { useState } from 'react';
import { FilmReviewType } from '../../types/film-review-type';

type FilmInfoLayoutProps = {
  film: FilmDataType;
  reviews: FilmReviewType[];
}

function FilmInfoLayout({film, reviews}: FilmInfoLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmInfoType.Overview);
  return (
    <div className="film-card__desc">
      <FilmCardMenu onTabSelect={(tab: FilmInfoType) => setActiveTab(tab)}/>
      {
        (activeTab === FilmInfoType.Overview && <FilmCardOverview {...film} />)
        || (activeTab === FilmInfoType.Details && <FilmCardDetails {...film} />)
        || (activeTab === FilmInfoType.Reviews && <FilmCardReviews reviews={reviews} />)
      }
    </div>
  );
}

export default FilmInfoLayout;

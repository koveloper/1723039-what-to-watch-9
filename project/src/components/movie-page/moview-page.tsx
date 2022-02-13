import { FilmDataProps } from '../../types/film-data-type';
import { MoviePageProps } from '../../types/moview-page-type';
import FilmCardMain from '../film-card-main/film-card-main';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import FilmCardMenu from '../film-card-menu/film-card-menu';
import FilmCardRating from '../film-card-rating/film-card-rating';
import FilmCardOverview from '../film-card-overview/film-card-overview';
import FilmCardDetails from '../film-card-details/film-card-details';
import FilmCardReviewsList from '../film-card-reviews-list/film-card-reviews-list';
import FilmCardBackground from '../film-card-background/film-card-background';

const getFilmCardDescription = (tabName: 'overview' | 'details' | 'reviews', props: FilmDataProps): JSX.Element => {
  switch(tabName) {
    case 'overview':
      return (
        <div className="film-card__desc">
          <FilmCardMenu activeTab={tabName}/>
          <FilmCardRating
            score={props.score}
            ratingLevel={props.rating}
            ratingCount={props.ratingCount}
          />
          <FilmCardOverview
            description={props.description}
            director={props.director}
            actors={props.actors.slice(0, 4)}
          />
        </div>
      );
    case 'details':
      return (
        <div className="film-card__desc">
          <FilmCardMenu activeTab={tabName}/>
          <FilmCardDetails {...props}/>
        </div>
      );
    case 'reviews':
      return (
        <div className="film-card__desc">
          <FilmCardMenu activeTab={tabName}/>
          <FilmCardReviewsList reviews={props.reviews}/>
        </div>
      );
      break;
    default:
      return <div></div>;
  }
};

function MoviewPage(props: MoviePageProps): JSX.Element {
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <FilmCardBackground title={props.film.title} imageUrl={props.film.backgroundImageUrl}/>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo isLight={false}/>
            <UserBlock/>
          </header>


          <div className="film-card__wrap">
            <FilmCardMain
              title={props.film.title}
              genre={props.film.genre}
              releaseYear={props.film.releaseYear}
              showAddReviewButton
            />
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <FilmCardPoster
              posterUrl={props.film.posterImageUrl}
              title={props.film.title}
              size='big'
            />
            {getFilmCardDescription(props.selectedTab, props.film)}
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={props.otherFilms}/>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MoviewPage;

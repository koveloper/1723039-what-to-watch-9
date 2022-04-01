import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import FilmCardMain from '../../components/film-card-main/film-card-main';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmsList from '../../components/films-list/films-list';
import UserBlock from '../../components/user-block/user-block';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import FilmTab from '../../components/film-tab/film-tab';
import FilmCardMenu from '../../components/film-card-menu/film-card-menu';
import Header from '../../components/header/header';
import { Comments } from '../../types/commentary';
import { FilmData } from '../../types/film-data-type';
import { FilmInfoType, PosterSize } from '../../utils/constants';
import { useState } from 'react';
import { HeaderType } from '../../utils/constants';
import { useAuth } from '../../hooks/use-auth';
import { useFavorite } from '../../hooks/use-favorite';
import { useFilmButtonsDefaultHandler } from '../../hooks/use-film-buttons-default-handler';

type MoviePageProps = {
  film: FilmData;
  comments: Comments;
  similarFilms: FilmData[];
  muted?: boolean;
}

export default function MoviePage(props: MoviePageProps): JSX.Element {
  const isAuthorized = useAuth();
  const handleFilmButtonsClick = useFilmButtonsDefaultHandler(props.film.id);
  const isFavorite = useFavorite(props.film.id);
  const [activeTab, setActiveTab] = useState(FilmInfoType.Overview);
  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className="film-card__bg">
            <img src={props.film.backgroundImage} alt={props.film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header type={HeaderType.FilmCard}>
            <UserBlock />
          </Header>
          <div className="film-card__wrap">
            <div className="film-card__info">
              <FilmCardMain
                title={props.film.name}
                genre={props.film.genre}
                releaseYear={props.film.released}
              >
                <FilmCardButtons
                  onButtonClick={handleFilmButtonsClick}
                  isShowAddReviewButton={isAuthorized}
                  isShowAddToFavorsButton={isAuthorized}
                  isFavorite={!!isFavorite}
                />
              </FilmCardMain>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <FilmCardPoster
              posterUrl={props.film.posterImage}
              title={props.film.name}
              size={PosterSize.Big}
            />
            <div className="film-card__desc">
              <FilmCardMenu onTabSelect={(tab: FilmInfoType) => setActiveTab(tab)}/>
              <FilmTab film={props.film} comments={props.comments} tab={activeTab}/>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <Catalog title='More like this' type='filtered'>
          <FilmsList films={props.similarFilms.length > 4 ? props.similarFilms.slice(0, 4) : props.similarFilms} muted={props.muted} />
        </Catalog>
        <Footer />
      </div>
    </>
  );
}

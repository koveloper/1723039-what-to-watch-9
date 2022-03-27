import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import FilmCardMain from '../../components/film-card-main/film-card-main';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { ALL_GENRES, FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP, PosterSize } from '../../utils/constants';
import { useState } from 'react';
import { HeaderType } from '../../components/header/header-type';
import { useAuth } from '../../hooks/use-auth';
import { useFilms } from '../../hooks/use-films';
import { usePromoFilm } from '../../hooks/use-promo-film';
import { useFavorite } from '../../hooks/use-favorite';
import { useFilmButtonsDefaultHandler } from '../../hooks/use-film-buttons-default-handler';
import { useFilmsByGenre } from '../../hooks/use-films-by-genre';
import { useGenres } from '../../hooks/use-genres';

type MainPageProps = {
  muted?: boolean;
}

export default function MainPage(props : MainPageProps): JSX.Element | null {
  const promoFilm = usePromoFilm();
  const films = useFilms();
  const [genre, setGenre] = useState(ALL_GENRES);
  const [maxFilmsOnPage, setMaxFilmsOnPage] = useState(FILMS_ON_PAGE_INITIAL);
  const genres: string[] = useGenres();
  const filmsByGenre = useFilmsByGenre(genre);
  const isPromoFilmFavorite = useFavorite(promoFilm ? promoFilm.id : -1);
  const filmButtonsClickHandler = useFilmButtonsDefaultHandler(promoFilm ? promoFilm.id : -1);
  const isAuthorized = useAuth();
  if(!promoFilm || !films) {
    return <Spinner />;
  }
  return (
    <>
      <section className='film-card'>
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header type={HeaderType.FilmCard}>
          <UserBlock/>
        </Header>
        <div data-testid="film-card-main" className="film-card__wrap">
          <div className="film-card__info">
            <FilmCardPoster title={promoFilm.name} posterUrl={promoFilm.posterImage} size={PosterSize.Medium}/>
            <FilmCardMain
              title={promoFilm.name}
              genre={promoFilm.genre}
              releaseYear={promoFilm.released}
            >
              <FilmCardButtons
                onButtonClick={filmButtonsClickHandler}
                isShowAddReviewButton={false}
                isShowAddToFavorsButton={isAuthorized}
                isFavorite={!!isPromoFilmFavorite}
              />
            </FilmCardMain>
          </div>
        </div>
      </section>
      <div className="page-content">
        <Catalog title='Catalog' titleHidden type='full'>
          <GenresList currentGenre={genre} onGenreChange={(newGenre) => setGenre(newGenre)} genres={genres}/>
          <FilmsList films={filmsByGenre.slice(0, maxFilmsOnPage)} muted={props.muted}/>
          {
            filmsByGenre.length > maxFilmsOnPage
              ? <ShowMoreButton onClick={() => setMaxFilmsOnPage(maxFilmsOnPage + FILMS_ON_PAGE_STEP)} />
              : null
          }
        </Catalog>
        <Footer />
      </div>
    </>
  );
}

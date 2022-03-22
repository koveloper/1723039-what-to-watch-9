import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import Spinner from '../../components/spinner/spinner';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import HeaderLayout from '../../layouts/header-layout/header-layout';
import UserBlock from '../../components/user-block/user-block';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import FilmCardMain from '../../components/film-card-main/film-card-main';
import { useAuth, useButtonsDefaultHandler, useFavorite, useFilms, usePromoFilm } from '../../hooks';
import { HeaderType } from '../../layouts/header-layout/header-type';
import { ALL_GENRES, FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP, PosterSize } from '../../utils/constants';
import { useState } from 'react';
import { filterFilmsByGenre, getGenresFromFilms } from '../app/utils';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import ShowMoreButton from '../../components/catalog/show-more-button';

export default function MainPage(): JSX.Element | null {
  const promoFilm = usePromoFilm();
  const films = useFilms();
  const [genre, setGenre] = useState(ALL_GENRES);
  const [maxFilmsOnPage, setMaxFilmsOnPage] = useState(FILMS_ON_PAGE_INITIAL);
  const genres: string[] = [ALL_GENRES, ...getGenresFromFilms(films || [])];
  const filmsByGenre = filterFilmsByGenre(films || [], genre);
  const isPromoFilmFavorite = useFavorite(promoFilm ? promoFilm.id : -1);
  const actionButtonClickHandler = useButtonsDefaultHandler(promoFilm ? promoFilm.id : -1);
  const isAuthorized = useAuth();
  if(!promoFilm) {
    return <Spinner />;
  }
  return (
    <>
      <section className='film-card'>
        <FilmCardBackground title={promoFilm.name} imageUrl={promoFilm.backgroundImage}/>
        <h1 className="visually-hidden">WTW</h1>
        <HeaderLayout type={HeaderType.FilmCard}>
          <UserBlock/>
        </HeaderLayout>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <FilmCardPoster title={promoFilm.name} posterUrl={promoFilm.posterImage} size={PosterSize.Medium}/>
            <FilmCardMain
              title={promoFilm.name}
              genre={promoFilm.genre}
              releaseYear={promoFilm.released}
            >
              <FilmCardButtons
                onButtonClick={actionButtonClickHandler}
                isShowAddReviewButton={false}
                isShowAddToFavorsButton={isAuthorized}
                isFavorite={isPromoFilmFavorite}
              />
            </FilmCardMain>
          </div>
        </div>
      </section>
      <CatalogLayout title='Catalog' titleHidden type='full'>
        <GenresList currentGenre={genre} onGenreChange={(newGenre) => setGenre(newGenre)} genres={genres}/>
        <FilmsList films={filmsByGenre.slice(0, maxFilmsOnPage)}/>
        {
          filmsByGenre.length > maxFilmsOnPage
            ? <ShowMoreButton onClick={() => setMaxFilmsOnPage(maxFilmsOnPage + FILMS_ON_PAGE_STEP)} />
            : null
        }
      </CatalogLayout>
    </>
  );
}

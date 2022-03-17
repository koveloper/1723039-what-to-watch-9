import ShowMoreButton from '../../components/catalog/show-more-button';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';
import { ALL_GENRES, FILMS_ON_PAGE_INITIAL, FILMS_ON_PAGE_STEP } from '../../utils/constants';
import { filterFilmsByGenre, getGenresFromFilms } from '../app/utils';

function FilmsGallery(): JSX.Element {
  const {films} = useSelector((state: State) => state.films);
  const [genre, setGenre] = useState(ALL_GENRES);
  const [maxFilmsOnPage, setMaxFilmsOnPage] = useState(FILMS_ON_PAGE_INITIAL);
  const genres: string[] = [ALL_GENRES, ...getGenresFromFilms(films || [])];
  const filmsByGenre = filterFilmsByGenre(films || [], genre);

  return (
    <>
      <GenresList currentGenre={genre} onGenreChange={(newGenre) => setGenre(newGenre)} genres={genres}/>
      <FilmsList films={filmsByGenre.slice(0, maxFilmsOnPage)}/>
      {filmsByGenre.length > maxFilmsOnPage ? <ShowMoreButton onClick={() => setMaxFilmsOnPage(maxFilmsOnPage + FILMS_ON_PAGE_STEP)} /> : null}
    </>
  );
}

export default FilmsGallery;

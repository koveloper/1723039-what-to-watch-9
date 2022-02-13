import GenresList from '../genres-list/genres-list';
import FilmsList from '../films-list/films-list';
import { FilmDataProps } from '../../types/film-data-type';
import { GenreProps } from '../../types/genre-type';

const getGenresListElement = (genres?: GenreProps[]): JSX.Element | null => genres ? <GenresList genres={genres} /> : null;

const getShowMoreButton = (isShown: boolean): JSX.Element | null => isShown ? (
  <div className="catalog__more">
    <button className="catalog__button" type="button">Show more</button>
  </div>
) : null;

function Catalog({genres, films, showMoreButton}: {genres?: GenreProps[], films: FilmDataProps[], showMoreButton: boolean}): JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {getGenresListElement(genres)}
      <FilmsList films={films}/>
      {getShowMoreButton(showMoreButton)}
    </section>
  );
}

export default Catalog;

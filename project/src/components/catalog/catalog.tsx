import GenresList from '../genres-list/genres-list';
import FilmsList from '../films-list/films-list';
import ShowMoreButton from './show-more-button';
import { FilmDataProps } from '../../types/film-data-type';
import { GenreProps } from '../../types/genre-type';

function Catalog({genres, films, showMoreButton}: {genres?: GenreProps[], films: FilmDataProps[], showMoreButton: boolean}): JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {genres ? <GenresList genres={genres} /> : null}
      <FilmsList films={films}/>
      {showMoreButton ? <ShowMoreButton /> : null}
    </section>
  );
}

export default Catalog;

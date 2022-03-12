import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import { FilmDataType } from '../../types/film-data-type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../../types/state';
import ShowMoreButton from '../../components/catalog/show-more-button';
import { showMoreFilms } from '../../store/action';

type MainPageProps = {
  promoFilm: FilmDataType,
  genres: string[]
}

function MainPage(props: MainPageProps): JSX.Element {
  const films = useSelector((state: State) => state.films);
  const maxFilmsOnPage = useSelector((state: State) => state.maxFilmsOnPage);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <FilmCardLayout film={props.promoFilm} type='reduced' />
      <CatalogLayout title='Catalog' titleHidden type='full'>
        <GenresList genres={props.genres} />
        <FilmsList films={films.slice(0, maxFilmsOnPage)}/>
        {films.length > maxFilmsOnPage ? <ShowMoreButton onClick={() => dispatch(showMoreFilms())} /> : null}
      </CatalogLayout>
    </>
  );
}

export default MainPage;

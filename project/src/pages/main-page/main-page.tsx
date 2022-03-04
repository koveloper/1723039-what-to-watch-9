import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import { FilmDataType } from '../../types/film-data-type';
import { useSelector } from 'react-redux';
import { State } from '../../types/state';

type MainPageProps = {
  promoFilm: FilmDataType,
  genres: string[]
}

function MainPage(props: MainPageProps): JSX.Element {
  const films = useSelector((state: State) => state.films);
  return (
    <>
      <FilmCardLayout film={props.promoFilm} type='reduced' />
      <CatalogLayout title='Catalog' titleHidden showMoreButton type='full'>
        <GenresList genres={props.genres} />
        <FilmsList films={films}/>
      </CatalogLayout>
    </>
  );
}

export default MainPage;

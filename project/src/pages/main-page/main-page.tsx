import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import FilmsGallery from './films-gallery';
import { FilmDataType } from '../../types/film-data-type';

type MainPageProps = {
  promoFilm: FilmDataType,
}

function MainPage(props: MainPageProps): JSX.Element {
  return (
    <>
      <FilmCardLayout film={props.promoFilm} type='reduced' />
      <CatalogLayout title='Catalog' titleHidden type='full'>
        <FilmsGallery />
      </CatalogLayout>
    </>
  );
}

export default MainPage;

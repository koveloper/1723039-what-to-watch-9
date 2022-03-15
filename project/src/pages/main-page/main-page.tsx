import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import FilmsGallery from './films-gallery';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';

function MainPage(): JSX.Element | null {
  const promoFilm = useSelector((state: State) => state.promoFilm);
  if(!promoFilm) {
    return null;
  }
  return (
    <>
      <FilmCardLayout film={promoFilm} type='reduced' />
      <CatalogLayout title='Catalog' titleHidden type='full'>
        <FilmsGallery />
      </CatalogLayout>
    </>
  );
}

export default MainPage;

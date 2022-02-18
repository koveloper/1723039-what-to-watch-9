import CatalogLayout from '../../layouts/catalog-layout/catalog-layout';
import FilmCard from '../../components/film-card/film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import FilmCardLayout from '../../layouts/film-card-layout/film-card-layout';
import { FilmDataProps } from '../../types/film-data-type';
import { GenreProps } from '../../types/genre-type';

function MainPage({filmData, filmsGallery, genres}: {
  filmData: FilmDataProps,
  filmsGallery: FilmDataProps[],
  genres: GenreProps[]
}): JSX.Element {
  <FilmCard {...filmData}/>;
  return (
    <>
      <FilmCardLayout {...filmData} />
      <CatalogLayout title='Catalog' titleHidden showMoreButton type='full'>
        <GenresList genres={genres} />
        <FilmsList films={filmsGallery}/>
      </CatalogLayout>
    </>
  );

}

export default MainPage;

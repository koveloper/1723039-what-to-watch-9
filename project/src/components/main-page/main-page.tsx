import Catalog from '../catalog/catalog';
import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';
import { FilmDataProps } from '../../types/film-data-type';
import { GenreProps } from '../../types/genre-type';

function MainPage({filmData, filmsGallery, genres}: {
  filmData: FilmDataProps,
  filmsGallery: FilmDataProps[],
  genres: GenreProps[]
}): JSX.Element {
  return (
    <>
      <FilmCard {...filmData}/>
      <div className="page-content">
        <Catalog genres={genres} films={filmsGallery} showMoreButton/>
        <Footer />
      </div>
    </>
  );

}

export default MainPage;

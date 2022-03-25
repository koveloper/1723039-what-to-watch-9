import Catalog from '../../components/catalog/catalog';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import Header from '../../components/header/header';
import { HeaderType } from '../../components/header/header-type';
import { useFavoriteFilms } from '../../hooks/use-favorite-films';

export default function UserListPage(): JSX.Element {
  const favoriteFilms = useFavoriteFilms();
  if(!favoriteFilms) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <Header type={HeaderType.UserOrSignIn}>
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock />
      </Header>
      <Catalog title='Catalog' titleHidden type='filtered'>
        <FilmsList films={favoriteFilms}/>
      </Catalog>
      <Footer />
    </div>
  );
}

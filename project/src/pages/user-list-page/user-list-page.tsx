import Catalog from '../../components/catalog/catalog';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import { useFavoriteFilms } from '../../hooks';
import { api } from '../../api/api';
import Header from '../../components/header/header';
import { HeaderType } from '../../components/header/header-type';

export default function UserListPage(): JSX.Element {
  const favoriteFilms = useFavoriteFilms();
  if(!favoriteFilms) {
    api.fetchFavoriteFilms();
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

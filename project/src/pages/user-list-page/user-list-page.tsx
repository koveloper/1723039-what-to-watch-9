import { api } from '../../api/api';
import Catalog from '../../components/catalog/catalog';
import FilmsList from '../../components/films-list/films-list';
import Spinner from '../../components/spinner/spinner';
import { useFavoriteFilms } from '../../hooks';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';

export default function UserListPage(): JSX.Element {
  const favoriteFilms = useFavoriteFilms();
  if(!favoriteFilms) {
    api.fetchFavoriteFilms();
    return <Spinner />;
  }
  return (
    <UserPageLayout title='My list'>
      <Catalog title='Catalog' titleHidden type='filtered'>
        <FilmsList films={favoriteFilms}/>
      </Catalog>
    </UserPageLayout>
  );
}

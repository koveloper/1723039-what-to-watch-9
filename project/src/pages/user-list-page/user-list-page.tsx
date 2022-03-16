import { useSelector } from 'react-redux';
import { api } from '../../api/api';
import Catalog from '../../components/catalog/catalog';
import FilmsList from '../../components/films-list/films-list';
import Spinner from '../../components/spinner/spinner';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';
import { State } from '../../store/types';

function UserListPage(): JSX.Element {
  const favoriteFilms = useSelector((state: State) => state.user.favoriteFilms);
  if(favoriteFilms === null) {
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


export default UserListPage;

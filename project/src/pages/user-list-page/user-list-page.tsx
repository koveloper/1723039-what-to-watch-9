import Catalog from '../../components/catalog/catalog';
import FilmsList from '../../components/films-list/films-list';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';
import { UserDataProps } from '../../types/user-data-type';

function UserListPage(props: UserDataProps): JSX.Element {
  return (
    <UserPageLayout title='My list'>
      <Catalog title='Catalog' titleHidden type='filtered'>
        <FilmsList films={props.favorites}/>
      </Catalog>
    </UserPageLayout>
  );
}


export default UserListPage;

import Catalog from '../../components/catalog/catalog';
import FilmsList from '../../components/films-list/films-list';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';
import { FilmDataType } from '../../types/film-data-type';

type UserDataProps = {
  favorites: FilmDataType[];
};

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

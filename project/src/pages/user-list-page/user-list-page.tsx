import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Catalog from '../../components/catalog/catalog';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';
import { UserDataProps } from '../../types/user-data-type';

function UserListPage(props: UserDataProps): JSX.Element {
  return (
    <UserPageLayout>
      <Catalog films={props.favorites} showMoreButton={false}/>
    </UserPageLayout>
  );
}


export default UserListPage;

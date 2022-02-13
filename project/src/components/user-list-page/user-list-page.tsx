import Footer from '../footer/footer';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import Catalog from '../catalog/catalog';
import { UserDataProps } from '../../types/user-data-type';

function UserListPage(props: UserDataProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLight={false}/>
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock />
      </header>
      <Catalog films={props.favorites} showMoreButton={false}/>
      <Footer />
    </div>
  );
}


export default UserListPage;

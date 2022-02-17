import HeaderLayout from '../header-layout/header-layout';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import { useLocation } from 'react-router-dom';
import { AppRoute, PageType } from '../../utils/constants';
import { DefaultLayoutProps } from '../../types/common-types';

const getPageTitle = (pathname: string): string => (pathname === AppRoute.SignIn
  ? 'Sign in'
  : 'My list');

const getUserBlock = (pathname: string): JSX.Element | null => (pathname === AppRoute.SignIn
  ? null
  : <UserBlock />
);

function UserPageLayout(props: DefaultLayoutProps): JSX.Element {
  const url = useLocation();
  return (
    <div className="user-page">
      <HeaderLayout pageType={PageType.User} title={getPageTitle(url.pathname)}>
        {getUserBlock(url.pathname)}
      </HeaderLayout>
      {props.children}
      <Footer />
    </div>
  );
}

export default UserPageLayout;

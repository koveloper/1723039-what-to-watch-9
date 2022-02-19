import HeaderLayout from '../header-layout/header-layout';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import HeaderTitleSimple from '../header-layout/header-title-simple';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { DefaultLayoutProps } from '../../types/common-types';
import { HeaderType } from '../header-layout/header-type';

function UserPageLayout(props: DefaultLayoutProps): JSX.Element {
  const url = useLocation();
  const title = (url.pathname === AppRoute.SignIn
    ? 'Sign in'
    : 'My list');
  return (
    <div className="user-page">
      <HeaderLayout type={HeaderType.UserOrSignIn}>
        <HeaderTitleSimple>{title}</HeaderTitleSimple>
        {url.pathname === AppRoute.SignIn ? null : <UserBlock />}
      </HeaderLayout>
      {props.children}
      <Footer />
    </div>
  );
}

export default UserPageLayout;

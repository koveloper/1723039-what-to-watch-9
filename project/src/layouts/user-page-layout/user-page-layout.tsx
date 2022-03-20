import HeaderLayout from '../header-layout/header-layout';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import HeaderTitleSimple from '../header-layout/header-title-simple';
import { HeaderType } from '../header-layout/header-type';
import { PropsWithChildren } from 'react';

type UserPageLayoutProps = {
  hideUserBlock?: boolean;
  title: string;
}

export default function UserPageLayout(props: PropsWithChildren<UserPageLayoutProps>): JSX.Element {
  return (
    <div className="user-page">
      <HeaderLayout type={HeaderType.UserOrSignIn}>
        <HeaderTitleSimple>{props.title}</HeaderTitleSimple>
        {props.hideUserBlock ? null : <UserBlock />}
      </HeaderLayout>
      {props.children}
      <Footer />
    </div>
  );
}


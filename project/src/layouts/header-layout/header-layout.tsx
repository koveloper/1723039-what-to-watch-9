import Logo from '../../components/logo/logo';
import { HeaderType } from './header-type';
import { PropsWithChildren } from 'react';

type HeaderLayoutProps = {
  type: HeaderType;
};

function HeaderLayout(props: PropsWithChildren<HeaderLayoutProps>): JSX.Element {
  return (
    <header className={props.type}>
      <Logo isLight={false}/>
      {props.children}
    </header>
  );
}

export default HeaderLayout;

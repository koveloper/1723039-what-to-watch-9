import Logo from '../logo/logo';
import { HeaderType } from './header-type';
import { memo, PropsWithChildren } from 'react';

type HeaderLayoutProps = {
  type: HeaderType;
};

function Header(props: PropsWithChildren<HeaderLayoutProps>): JSX.Element {
  return (
    <header className={props.type}>
      <Logo isLight={false}/>
      {props.children}
    </header>
  );
}

export default memo(Header);

import Logo from '../logo/logo';
import { memo, PropsWithChildren } from 'react';
import { HeaderType } from '../../utils/constants';

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

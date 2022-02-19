import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import LogoLetter from './logo-letter';

function Logo({isLight}: {isLight: boolean}): JSX.Element {
  return (
    <div className="logo">
      <Link className={isLight ? 'logo__link logo__link--light' : 'logo__link'} to={AppRoute.Root}>
        <LogoLetter num={1} letter='W'></LogoLetter>
        <LogoLetter num={2} letter='T'></LogoLetter>
        <LogoLetter num={3} letter='W'></LogoLetter>
      </Link>
    </div>
  );
}

export default Logo;

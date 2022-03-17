import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, APP_TITLE } from '../../utils/constants';
import LogoLetter from './logo-letter';

type LogoProps = {
  isLight: boolean;
}

function Logo({isLight}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link className={isLight ? 'logo__link logo__link--light' : 'logo__link'} to={AppRoute.Root}>
        {[...APP_TITLE].map((letter, i) => <LogoLetter key={`letter-${i.toString()}`} num={i + 1} letter={letter}></LogoLetter>)}
      </Link>
    </div>
  );
}

export default memo(Logo);

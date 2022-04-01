import { nanoid } from '@reduxjs/toolkit';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, APP_TITLE } from '../../utils/constants';

type LogoProps = {
  isLight: boolean;
}

function Logo({isLight}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link className={isLight ? 'logo__link logo__link--light' : 'logo__link'} to={AppRoute.Root}>
        {[...APP_TITLE].map((letter, i) => (<span key={`logo-letter-${nanoid()}`} className={`logo__letter logo__letter--${i}`}>{letter}</span>))}
      </Link>
    </div>
  );
}

export default memo(Logo);

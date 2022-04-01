import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useGenerateKeys } from '../../hooks/use-generate-keys';
import { AppRoute, APP_TITLE } from '../../utils/constants';

type LogoProps = {
  isLight: boolean;
}

function Logo({isLight}: LogoProps): JSX.Element {
  const lettersKeys = useGenerateKeys('app-letter', APP_TITLE.length);
  return (
    <div className="logo">
      <Link className={isLight ? 'logo__link logo__link--light' : 'logo__link'} to={AppRoute.Root}>
        {[...APP_TITLE].map((letter, i) => (<span key={lettersKeys[i]} className={`logo__letter logo__letter--${i}`}>{letter}</span>))}
      </Link>
    </div>
  );
}

export default memo(Logo);

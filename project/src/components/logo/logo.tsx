import { getBlankLink } from '../../utils/logic-utils';

const logoSign = 'WTW';

const getLogoLetter = (letter: string, letterNum: number): JSX.Element => (
  <span key={`logo-letter-${letterNum}`} className={`logo__letter logo__letter--${letterNum}`}>{letter}</span>
);

function Logo({isLight}: {isLight: boolean}): JSX.Element {
  return (
    <div className="logo">
      <a className={isLight ? 'logo__link logo__link--light' : 'logo__link'} href={getBlankLink()}>
        {[...logoSign].map((l, i) => getLogoLetter(l, i + 1))}
      </a>
    </div>
  );
}

export default Logo;

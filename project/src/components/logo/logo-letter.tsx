type LogoLetterProps = {
  num: number;
  letter: string;
}

export default function LogoLetter({num, letter}: LogoLetterProps): JSX.Element {
  return (
    <span key={`logo-letter-${num}`} className={`logo__letter logo__letter--${num}`}>{letter}</span>
  );
}

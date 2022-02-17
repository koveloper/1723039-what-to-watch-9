export default function LogoLetter({num, letter}: {num: number, letter: string}): JSX.Element {
  return (
    <span key={`logo-letter-${num}`} className={`logo__letter logo__letter--${num}`}>{letter}</span>
  );
}

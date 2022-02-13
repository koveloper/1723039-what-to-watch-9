import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import FilmCardContent from '../film-card-content/film-card-content';
import FilmCardBackground from '../film-card-background/film-card-background';
import { FilmDataProps } from '../../types/film-data-type';

function FilmCard(props: FilmDataProps): JSX.Element {
  return (
    <section className="film-card">
      <FilmCardBackground
        title={props.title}
        imageUrl={props.backgroundImageUrl}
      />
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <Logo isLight={false}/>
        <UserBlock />
      </header>
      <FilmCardContent  {...props}/>
    </section>
  );
}

export default FilmCard;

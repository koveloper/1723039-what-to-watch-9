import { FilmDataProps } from '../../types/film-data-type';

function FilmLogo(props : FilmDataProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.logoImageUrl} alt={props.title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={props.filmPageUrl}>{props.title}</a>
      </h3>
    </article>
  );
}

export default FilmLogo;

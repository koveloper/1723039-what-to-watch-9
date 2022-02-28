import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilmDataType } from '../../types/film-data-type';
import { AppRoute } from '../../utils/constants';

type FilmLogoProps = {
  film: FilmDataType;
  onHover: (id: number) => void;
}

function FilmLogo({film, onHover} : FilmLogoProps): JSX.Element {
  const navigate = useNavigate();
  const onMouseEnterHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    onHover(film.id);
  };
  const onMouseExitHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    onHover(-1);
  };
  const onClickHandler = () => navigate(`${AppRoute.Films}/${film.id}`);
  return (
    <article onClick={onClickHandler} onMouseLeave={onMouseExitHandler} onMouseEnter={onMouseEnterHandler} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={film.videoLink}>{film.name}</a>
      </h3>
    </article>
  );
}

export default FilmLogo;

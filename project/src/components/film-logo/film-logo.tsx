import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FilmDataType } from '../../types/film-data-type';
import { AppRoute } from '../../utils/constants';

type FilmLogoProps = {
  film: FilmDataType;
}

function FilmLogo({film} : FilmLogoProps): JSX.Element {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setHovered] = useState(false);
  const onMouseEnterHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setHovered(true);
  };
  const onMouseExitHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setHovered(false);
  };
  useEffect(() => {
    const player = videoRef.current;
    const playFunc = () => {
      if(timerId) {
        clearTimeout(timerId);
      }
      if(!player) {
        return;
      }
      player.src = film.videoLink;
      player.play();
    };
    const timerId = isHovered ? setTimeout(playFunc, 1000) : null;
    return () => {
      if(timerId) {
        clearTimeout(timerId);
      }
      if(!player) {
        return;
      }
      player.pause();
      player.src = '';
    };
  }, [isHovered, film.videoLink]);

  const onClickHandler = () => navigate(`${AppRoute.Films}/${film.id}`);
  return (
    <article onClick={onClickHandler} onMouseLeave={onMouseExitHandler} onMouseEnter={onMouseEnterHandler} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <video ref={videoRef} poster={film.previewImage} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmLogo;

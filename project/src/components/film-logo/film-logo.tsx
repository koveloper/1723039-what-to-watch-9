import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FilmData } from '../../types/film-data-type';
import { AppRoute } from '../../utils/constants';

type FilmLogoProps = {
  film: FilmData;
  muted?: boolean;
}

function FilmLogo({film, muted} : FilmLogoProps): JSX.Element {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>();
  const onClickHandler = useCallback(() => navigate(`${AppRoute.Films}/${film.id}`), [film.id]);
  const onMouseEnterHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setTimer(setTimeout(() => {
      if(!videoRef.current) {
        return;
      }
      videoRef.current.play();
    }, 1000));
  };
  const onMouseExitHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    if(timer) {
      clearTimeout(timer);
    }
    setTimer(null);
    if(videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <article data-testid="film-logo" onClick={onClickHandler} onMouseLeave={onMouseExitHandler} onMouseEnter={onMouseEnterHandler} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <video src={film.videoLink} ref={videoRef} poster={film.previewImage} width="280" height="175" muted={muted === undefined ? true : muted}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmLogo;

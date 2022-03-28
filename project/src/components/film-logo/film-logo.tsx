import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FilmData } from '../../types/film-data-type';
import { AppRoute } from '../../utils/constants';

type FilmLogoProps = {
  film: FilmData;
  muted?: boolean;
}

function FilmLogo({film, muted} : FilmLogoProps): JSX.Element {
  console.log('render');
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setHovered] = useState(false);
  console.log(`isHovered: ${isHovered}`);
  console.log(`videoRef: ${videoRef}`);
  console.log(`muted: ${muted}`);
  const onClickHandler = useCallback(() => navigate(`${AppRoute.Films}/${film.id}`), [film.id]);
  useEffect(() => {
    const player = videoRef.current;
    const playFunc = () => {
      console.log('play-func');
      if(timerId) {
        clearTimeout(timerId);
      }
      if(!player) {
        return;
      }
      player.src = film.videoLink;
      console.log('play');
      player.play();
    };
    if(isHovered) {
      console.log('effect');
    }
    const timerId = isHovered ? setTimeout(playFunc, 1000) : null;
    return isHovered
      ? () => {
        if(!player) {
          return;
        }
        if(timerId) {
          console.log('clear timeout');
          clearTimeout(timerId);
        }
        player.pause();
        player.src = '';
      }
      : () => void 0;
  }, [isHovered, film.videoLink]);

  const onMouseEnterHandler = (evt: SyntheticEvent) => {
    console.log('hovered!!!');
    evt.stopPropagation();
    setHovered(true);
  };
  const onMouseExitHandler = (evt: SyntheticEvent) => {
    console.log('mouse out');
    evt.stopPropagation();
    setHovered(false);
  };

  return (
    <article data-testid="film-logo" onClick={onClickHandler} onMouseLeave={onMouseExitHandler} onMouseEnter={onMouseEnterHandler} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        {
          (muted === undefined || muted)
            ? <video ref={videoRef} poster={film.previewImage} width="280" height="175" muted/>
            : <video ref={videoRef} poster={film.previewImage} width="280" height="175"/>
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmLogo;

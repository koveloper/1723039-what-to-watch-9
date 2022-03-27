import { useEffect, useRef, useState } from 'react';
import { getTimeFromSeconds } from './utils';
import { useNavigate } from 'react-router-dom';
import PlayButton from './play-button';
import Spinner from '../spinner/spinner';

export type PlayerProps = {
    title: string;
    videoLink: string;
}

export default function Player(props: PlayerProps): JSX.Element {
  //
  const playerRef = useRef<HTMLDivElement>(null);
  const player = playerRef.current;
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  //
  const [initialized, setInitialized] = useState(false);
  const [playing, setPlaying] = useState<boolean | undefined>(undefined);
  const [fullscreen, setFullscreen] = useState<boolean | undefined>(undefined);
  const [videoDuration, setVideoDuration] = useState(0);
  const [secondsWatched, setSecondsWatched] = useState(0);
  const navigate = useNavigate();
  //effect for handle full screen mode

  useEffect(() => {
    if(!player) {
      return;
    }
    if(fullscreen) {
      player.requestFullscreen();
    } else if(document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [player, fullscreen]);
  //effect for initial video setup and playback
  useEffect(() => {
    if(!video) {
      return;
    }
    setVideoDuration(video.duration);
    if(playing === undefined) {
      return;
    }
    if(playing) {
      video.play();
    } else {
      video.pause();
    }
  }, [video, playing]);
  //setup handlers and vars
  const playButtonClickHandler = () => {
    setPlaying(!playing);
  };
  const fullScreenButtonClickHandler = () => {
    setFullscreen(!fullscreen);
  };
  const progress = Math.round((secondsWatched / videoDuration) * 100) || 0;
  const secondsLeft = Math.floor(videoDuration - secondsWatched);
  const timeLeft = getTimeFromSeconds(secondsLeft);

  return (
    <div data-testid="player-root" ref={playerRef} className="player">
      <video
        data-testid="video"
        ref={videoRef}
        onCanPlay={() => setInitialized(true)}
        onTimeUpdate={() => setSecondsWatched(video ? video.currentTime : 0)}
        className="player__video"
        poster="img/player-poster.jpg"
      >
        <source src={props.videoLink}/>
      </video>
      {
        initialized
          ? null
          : <Spinner />
      }
      <button onClick={() => navigate(-1)} type="button" className="player__exit">Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">-{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <PlayButton playing={!!playing} onClick={playButtonClickHandler} />
          <div className="player__name">{props.title}</div>

          <button onClick={fullScreenButtonClickHandler} type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

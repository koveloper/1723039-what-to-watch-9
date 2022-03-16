import { useEffect, useRef, useState } from 'react';
import PlayButton from './play-button';
import VideoComponent from './video-component';

export type PlayerProps = {
    title: string;
    videoLink: string;
}

const getTimeFromSeconds = (seconds: number) => {
  const timeLeft = [];
  if(seconds > 3600) {
    timeLeft.push(Math.floor(seconds / 3600));
  }
  timeLeft.push(Math.floor((seconds % 3600) / 60));
  timeLeft.push(seconds % 60);
  return timeLeft.map((t) => [t < 10 ? '0' : '', t].join('')).join(':');
};

function Player(props: PlayerProps): JSX.Element {
  const playerRef = useRef<HTMLDivElement>(null);
  const player = playerRef.current;
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [secondsWatched, setSecondsWatched] = useState(0);
  const progress = Math.round((secondsWatched / videoDuration) * 100) || 0;
  const secondsLeft = Math.floor(videoDuration - secondsWatched);
  const timeLeft = getTimeFromSeconds(secondsLeft);

  const playButtonClickHandler = () => {
    setPlaying(!playing);
  };
  const fullScreenButtonClickHandler = () => {
    setFullscreen(!fullscreen);
  };
  useEffect(() => {
    if(!player) {
      return;
    }
    if(fullscreen) {
      player.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [player, fullscreen]);
  return (
    <div ref={playerRef} className="player">
      <VideoComponent
        durationChanged={setVideoDuration}
        tickTock={setSecondsWatched}
        isPlaying={playing}
        videoLink={props.videoLink}
      />

      <button onClick={() => window.history.back()} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">-{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <PlayButton playing={playing} onClick={playButtonClickHandler} />
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

export default Player;

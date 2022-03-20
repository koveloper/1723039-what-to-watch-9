import { memo, useEffect, useRef } from 'react';

type VideoComponentProps = {
    isPlaying: boolean;
    videoLink: string;
    onLoad: () => void;
    durationChanged: (value: number) => void;
    tickTock: (secondsPassed: number) => void;
}

function VideoComponent(props: VideoComponentProps):JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const player = videoRef.current;
  if(player) {
    if(props.isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }
  const timeUpdatedHandler = () => {
    if(!player) {
      return;
    }
    props.tickTock(player.currentTime);
  };
  useEffect(() => {
    if(!player) {
      return;
    }
    props.durationChanged(player.duration);
  }, [player]);
  return (
    <video onCanPlay={props.onLoad} onTimeUpdate={timeUpdatedHandler} ref={videoRef} className="player__video" poster="img/player-poster.jpg">
      <source src={props.videoLink}/>
    </video>
  );
}

export default memo(VideoComponent, (prevProps, nextProps) => (
  prevProps.isPlaying === nextProps.isPlaying && prevProps.videoLink === nextProps.videoLink
));

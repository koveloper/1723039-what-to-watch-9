import { memo } from 'react';
import Svg from '../svg/svg';

type PlayButtonProps = {
    playing: boolean,
    onClick: () => void
}

function PlayButton(props: PlayButtonProps):JSX.Element {
  return (
    <button onClick={props.onClick} type="button" className="player__play">
      {props.playing
        ? (
          <Svg width={14} height={21} href="#pause"/>
        )
        : (
          <Svg width={19} height={19} href="#play-s"/>
        )}
      <span>{props.playing ? 'Play' : 'Pause'}</span>
    </button>
  );
}

export default memo(PlayButton, (prevProps, nextProps) => (prevProps.playing === nextProps.playing));

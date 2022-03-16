import { memo } from 'react';

type PlayButtonProps = {
    playing: boolean,
    onClick: () => void
}

function PlayButton(props: PlayButtonProps):JSX.Element {
  return (
    <button onClick={props.onClick} type="button" className="player__play">
      {props.playing
        ? (
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"></use>
          </svg>
        )
        : (
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
        )}
      <span>{props.playing ? 'Play' : 'Pause'}</span>
    </button>
  );
}

export default memo(PlayButton, (prevProps, nextProps) => (prevProps.playing === nextProps.playing));

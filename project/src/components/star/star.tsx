import { memo } from 'react';

type StarProps = {
  value: number;
  checked: boolean;
  onClickCallback: (value: number) => void;
}

function Star(props: StarProps): JSX.Element {
  return (
    <>
      <input
        checked={props.checked}
        onChange={() => props.onClickCallback(props.value)}
        className="rating__input"
        id={`star-${props.value}`}
        type="radio"
        name="rating"
        value={`${props.value}`}
      />
      <label className="rating__label" htmlFor={`star-${props.value}`}>Rating {props.value.toString()}</label>
    </>
  );
}

export default memo(Star, (prevProps, newProps) => (prevProps.checked === newProps.checked));

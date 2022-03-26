import { memo } from 'react';

type StarProps = {
  value: number;
  checked: boolean;
  onClickCallback: (value: number) => void;
}

function Star(props: StarProps): JSX.Element {
  const onChangeHandler = () => props.onClickCallback(props.value);
  return (
    <>
      <input
        checked={props.checked}
        onChange={onChangeHandler}
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

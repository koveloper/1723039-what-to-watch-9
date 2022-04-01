import { memo, PropsWithChildren } from 'react';

type SvgButtonProps = {
    title: string;
    onClick: () => void;
}

function SvgButton(props: PropsWithChildren<SvgButtonProps>): JSX.Element {
  return (
    <button onClick={props.onClick} className="btn btn--play film-card__button" type="button">
      {props.children}
      <span>{props.title}</span>
    </button>
  );
}

export default memo(
  SvgButton,
  (prevProps, nextProps) => (prevProps.title === nextProps.title && prevProps.children === nextProps.children),
);

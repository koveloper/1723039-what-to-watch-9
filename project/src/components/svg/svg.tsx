type SvgProps = {
    width: number;
    height: number;
    href: string;
}

function Svg(props: SvgProps): JSX.Element {
  return (
    <svg viewBox={`0 0 ${props.width} ${props.height}`} width={props.width.toString()} height={props.height.toString()}>
      <use xlinkHref={props.href}></use>
    </svg>
  );
}

export default Svg;

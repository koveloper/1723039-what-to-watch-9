import { PropsWithChildren } from 'react';

type DetailsProps = {
    title: string;
}

function Details(props: PropsWithChildren<DetailsProps>): JSX.Element {
  return (
    <p className="film-card__details-item">
      <strong className="film-card__details-name">{props.title}</strong>
      <span className="film-card__details-value">{props.children}</span>
    </p>
  );
}

export default Details;

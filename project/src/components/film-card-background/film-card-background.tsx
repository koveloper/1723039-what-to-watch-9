import { memo } from 'react';

export type FilmCardBackgroundProps = {
  imageUrl: string;
  title: string;
}

function FilmCardBackground(props: FilmCardBackgroundProps): JSX.Element {
  return (
    <div className="film-card__bg">
      <img src={props.imageUrl} alt={props.title} />
    </div>
  );
}

export default memo(FilmCardBackground);

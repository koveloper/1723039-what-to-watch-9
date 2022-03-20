import { PropsWithChildren } from 'react';

type FilmCardMainProps = {
  title: string;
  genre: string;
  releaseYear: number;
}

function FilmCardMain(props: PropsWithChildren<FilmCardMainProps>): JSX.Element {
  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">{props.title}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{props.genre}</span>
        <span className="film-card__year">{props.releaseYear}</span>
      </p>
      {props.children}
    </div>
  );
}

export default FilmCardMain;

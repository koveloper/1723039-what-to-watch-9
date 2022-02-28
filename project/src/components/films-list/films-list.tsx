import FilmLogo from '../film-logo/film-logo';
import { FilmDataType } from '../../types/film-data-type';
import { useState } from 'react';

type FilmsListProps = {
  films: FilmDataType[];
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [hoverCardId, setHoverCard] = useState(-1);
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmLogo key={`film-preview-${film.id}`} film={film} onHover={(id) => setHoverCard(id)}/>)}
      <div className='visually-hidden'>{hoverCardId}</div>
    </div>
  );
}

export default FilmsList;

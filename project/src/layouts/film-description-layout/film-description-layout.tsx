import FilmCardMenu from '../../components/film-card-menu/film-card-menu';
import { DefaultLayoutProps } from '../../types/common-types';

function FilmInfoLayout(props: DefaultLayoutProps): JSX.Element {
  return (
    <div className="film-card__desc">
      <FilmCardMenu />
      {props.children}
    </div>
  );
}

export default FilmInfoLayout;

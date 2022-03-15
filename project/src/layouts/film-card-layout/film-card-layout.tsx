import FilmCardBackground from '../../components/film-card-background/film-card-background';
import HeaderLayout from '../../layouts/header-layout/header-layout';
import UserBlock from '../../components/user-block/user-block';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmCardMain from '../../components/film-card-main/film-card-main';
import ComponentWrapper from '../../components/component-wrapper/component-wrapper';
import { PropsWithChildren } from 'react';
import { FilmDataType } from '../../types/film-data-type';
import { HeaderType } from '../header-layout/header-type';
import { PosterSize } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';
import { AuthStatus } from '../../store/constants';

type FilmCardLayoutProps = {
  type: 'full' | 'reduced';
  film: FilmDataType;
}

function FilmCardLayout(props: PropsWithChildren<FilmCardLayoutProps>): JSX.Element {
  const {authStatus} = useSelector((state: State) => state.user);
  return (
    <section className={props.type === 'full' ? 'film-card film-card--full' : 'film-card'}>
      <ComponentWrapper wrapperClassName={props.type === 'full' ? 'film-card__hero' : null}>
        <FilmCardBackground title={props.film.name} imageUrl={props.film.backgroundImage}/>
        <h1 className="visually-hidden">WTW</h1>
        <HeaderLayout type={HeaderType.FilmCard}>
          <UserBlock/>
        </HeaderLayout>
        <div className="film-card__wrap">
          <div className="film-card__info">
            {props.type === 'reduced'
              ? <FilmCardPoster title={props.film.name} posterUrl={props.film.posterImage} size={PosterSize.Medium}/>
              : null}
            <FilmCardMain
              id={props.film.id}
              title={props.film.name}
              genre={props.film.genre}
              releaseYear={props.film.released}
              showAddReviewButton={props.type === 'full' && authStatus === AuthStatus.Authorized}
              showAddToFavorsButton={authStatus === AuthStatus.Authorized}
            />
          </div>
        </div>
      </ComponentWrapper>
      {props.children}
    </section>
  );
}

export default FilmCardLayout;

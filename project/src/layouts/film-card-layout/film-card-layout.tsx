import FilmCardBackground from '../../components/film-card-background/film-card-background';
import HeaderLayout from '../../layouts/header-layout/header-layout';
import UserBlock from '../../components/user-block/user-block';
import FilmCardPoster from '../../components/film-card-poster/film-card-poster';
import FilmCardMain from '../../components/film-card-main/film-card-main';
import ComponentWrapper from '../../components/component-wrapper/component-wrapper';
import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { FilmDataProps } from '../../types/film-data-type';
import { AppRoute, PosterSize } from '../../utils/constants';
import { HeaderType } from '../header-layout/header-type';

function FilmCardLayout(props: PropsWithChildren<FilmDataProps>): JSX.Element {
  const url = useLocation();
  const classes = url.pathname === AppRoute.Root
    ? 'film-card'
    : 'film-card film-card--full';
  const poster = url.pathname === AppRoute.Root
    ? <FilmCardPoster title={props.title} posterUrl={props.posterImageUrl} size={PosterSize.Medium}/>
    : null;
  const content = (
    <>
      <FilmCardBackground title={props.title} imageUrl={props.backgroundImageUrl}/>
      <h1 className="visually-hidden">WTW</h1>
      <HeaderLayout type={HeaderType.FilmCard}>
        <UserBlock/>
      </HeaderLayout>
      <div className="film-card__wrap">
        <div className="film-card__info">
          {poster}
          <FilmCardMain
            title={props.title}
            genre={props.genre}
            releaseYear={props.releaseYear}
            showAddReviewButton={url.pathname !== AppRoute.Root}
          />
        </div>
      </div>
    </>
  );
  return (
    <section className={classes}>
      {url.pathname === AppRoute.Root
        ? content
        : <ComponentWrapper wrapperClassName='film-card__hero'>{content}</ComponentWrapper>}
      {props.children}
    </section>
  );
}

export default FilmCardLayout;

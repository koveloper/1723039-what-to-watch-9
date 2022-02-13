import { FilmDataProps } from '../types/film-data-type';
import { filmDataMock } from './film-card-data';

const titles: string[] = [
  'Fantastic Beasts: The Crimes of Grindelwald',
  'Bohemian Rhapsody',
  'Macbeth',
  'Aviator',
  'We need to talk about Kevin',
  'What We Do in the Shadows',
  'Revenant',
  'Johnny English',
  'Shutter Island',
  'Pulp Fiction',
  'No Country for Old Men',
  'Snatch',
  'Moonrise Kingdom',
  'Seven Years in Tibet',
  'Midnight Special',
  'War of the Worlds',
  'Dardjeeling Limited',
  'Orlando',
  'Mindhunter',
  'Midnight Special',
];

const getFilmCardPropsFromTitle = (title: string) : FilmDataProps => {
  const baseName = title.toLowerCase().replaceAll(/\W{2}|\W/gm, '-');
  return Object.assign({}, filmDataMock, {
    title,
    logoImageUrl: `img/${baseName}.jpg`,
    posterImageUrl: `img/${baseName}-poster.jpg`,
    backgroundImageUrl: `img/bg-${baseName}.jpg`,
  });
};

export const filmsListMock: FilmDataProps[] = titles.map((title) => getFilmCardPropsFromTitle(title));
export const reducedFilmsListMock: FilmDataProps[] = titles.slice(0, 4).map((title) => getFilmCardPropsFromTitle(title));
export const favoriteFilmsListMock: FilmDataProps[] = titles.slice(0, 9).map((title) => getFilmCardPropsFromTitle(title));


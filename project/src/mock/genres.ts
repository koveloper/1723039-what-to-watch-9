import { GenreProps } from '../types/genre-type';
import { getBlankLink } from '../utils/logic-utils';

const genresArray:string[] = [
  'All genres',
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
];

export const genresMock:GenreProps[] = genresArray.map((genre, i) => ({
  url: getBlankLink(),
  title: genre,
  key: `genre-id-${i}`} as GenreProps),
);

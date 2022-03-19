import fakerStatic from 'faker';
import { Comment } from '../types/commentary';
import { FilmData, FilmFullData, Films } from '../types/film-data-type';
import { UserWithoutTokenType } from '../types/user-type';

const createRandomName = () => `${fakerStatic.name.firstName()} $${fakerStatic.name.lastName()}`;

export const createFakeUser = (): UserWithoutTokenType => ({
  avatarUrl: fakerStatic.internet.url(),
  id: fakerStatic.datatype.number(),
  email: fakerStatic.internet.email(),
  name: createRandomName(),
});

export const createFakeFavoriteFilmsIdList = (): number[] => fakerStatic.datatype.array(fakerStatic.datatype.number(8)).map(
  (el) => fakerStatic.datatype.number(20),
).sort((a, b) => a - b).reduce((acc, el) => {
  if(acc.length === 0 || acc[acc.length - 1] !== el) {
    acc.push(el);
  }
  return acc;
}, [] as number[]);

export const createFakeFilmData = (idValue?: number): FilmData => ({
  name: fakerStatic.name.title(),
  posterImage: fakerStatic.image.imageUrl(),
  previewImage: fakerStatic.image.imageUrl(),
  backgroundImage: fakerStatic.internet.url(),
  backgroundColor: fakerStatic.commerce.color(),
  description: fakerStatic.lorem.paragraphs(1 + fakerStatic.datatype.number(2)),
  rating: 1 + fakerStatic.datatype.number(10),
  scoresCount: fakerStatic.datatype.number(30000),
  director: createRandomName(),
  starring: fakerStatic.datatype.array(1 + fakerStatic.datatype.number(5)).map((el) => createRandomName()),
  runTime: 50 + fakerStatic.datatype.number(90),
  genre: fakerStatic.name.title(),
  released: 2000 + fakerStatic.datatype.number(21),
  id: idValue ? idValue : fakerStatic.datatype.number(20),
  videoLink: fakerStatic.internet.url(),
  previewVideoLink: fakerStatic.internet.url(),
  isFavorite: fakerStatic.datatype.boolean(),
});

export const createFakeComment = (): Comment => ({
  id: fakerStatic.datatype.number(1000),
  rating: fakerStatic.datatype.number(10),
  comment: fakerStatic.lorem.paragraph(),
  date: fakerStatic.date.past().toISOString(),
  user: {
    id: fakerStatic.datatype.number(1000),
    name: createRandomName(),
  },
});

export const createFakeFilmFullData = (): FilmFullData => (() => {
  const id = fakerStatic.datatype.number(20);
  return {
    id,
    data: createFakeFilmData(id),
    similar: createFakeFilms(fakerStatic.datatype.number(8)),
    comments: Array(fakerStatic.datatype.number(8)).fill(null).map(() => createFakeComment()),
  };
})();

export const createFakeFilms = (count?: number): Films => Array(count ? count : 30).fill(null).map((el) => createFakeFilmData());

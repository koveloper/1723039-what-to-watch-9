import fakerStatic from 'faker';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { Comment, Comments } from '../types/commentary';
import { FilmData, FilmFullData, Films } from '../types/film-data-type';
import { UserType, UserWithoutTokenType } from '../types/user-type';

const generator = fakerStatic;

const createRandomName = () => `${generator.name.firstName()} $${generator.name.lastName()}`;

export const createFakeUser = (): UserWithoutTokenType => ({
  avatarUrl: generator.internet.url(),
  id: generator.datatype.number(),
  email: generator.internet.email(),
  name: createRandomName(),
});

export const createFakeFavoriteFilmsIdList = (): number[] => generator.datatype.array(generator.datatype.number(8)).map(
  (el) => generator.datatype.number(20),
).sort((a, b) => a - b).reduce((acc, el) => {
  if(acc.length === 0 || acc[acc.length - 1] !== el) {
    acc.push(el);
  }
  return acc;
}, [] as number[]);

export const createFakeFilmData = (idValue?: number): FilmData => ({
  name: generator.name.title(),
  posterImage: generator.image.imageUrl(),
  previewImage: generator.image.imageUrl(),
  backgroundImage: generator.image.imageUrl(),
  backgroundColor: generator.commerce.color(),
  description: generator.lorem.paragraph(),
  rating: 1 + generator.datatype.number(10),
  scoresCount: generator.datatype.number(30000),
  director: createRandomName(),
  starring: generator.datatype.array(1 + generator.datatype.number(5)).map((el) => createRandomName()),
  runTime: 50 + generator.datatype.number(90),
  genre: generator.name.title(),
  released: 2000 + generator.datatype.number(21),
  id: idValue ? idValue : generator.datatype.number(20),
  videoLink: generator.internet.url(),
  previewVideoLink: generator.internet.url(),
  isFavorite: generator.datatype.boolean(),
});

export const createFakeComment = (): Comment => ({
  id: generator.datatype.number(1000),
  rating: generator.datatype.number(10),
  comment: generator.lorem.paragraph(),
  date: generator.date.past().toISOString(),
  user: {
    id: generator.datatype.number(1000),
    name: createRandomName(),
  },
});

export const createFakeFilmFullData = (): FilmFullData => (() => {
  const id = generator.datatype.number(20);
  return {
    id,
    data: createFakeFilmData(id),
    similar: createFakeFilms(generator.datatype.number(8)),
    comments: Array(generator.datatype.number(8)).fill(null).map(() => createFakeComment()),
  };
})();

export const createFakeFilms = (count?: number): Films => Array(count ? count : 30).fill(null).map((el, i) => createFakeFilmData(100 + i));

export const createFakeComments = (count?: number): Comments => Array(count ? count : 8).fill(null).map((el) => createFakeComment());

export const createFakeEmail = () => generator.internet.email();

export const createFakePassword = () => generator.random.word();

export const createFakeToken = () => generator.datatype.uuid();

export const createFakeUserResponse = (): UserType => (Object.assign(createFakeUser() , {token: createFakeToken()}));

export const createFakeGenres = (count?: number): string[] => Array(count ? count : 8).fill(null).map((el) => (generator.name.firstName() + generator.datatype.uuid()));

export const createFakeUrl = (): string => generator.internet.url();

export const createFakeParagraph = (): string => generator.lorem.paragraph();

export const createInitialState = ():State => ({
  user: {
    authStatus: AuthStatus.Unknown,
    userData: null,
    favoriteFilmsIdList: null,
  },
  films: {
    all: null,
    promoFilm: null,
    fullDataFilms: {},
  },
  service: {
    redirect: null,
    error: null,
  },
});

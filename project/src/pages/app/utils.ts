import { Films } from '../../types/film-data-type';
import { ALL_GENRES } from '../../utils/constants';

export const getGenresFromFilms = (films: Films):string[] => Object.values(films.reduce((prev, curr) => Object.assign(prev, {[curr.genre]: curr.genre}), {}));

export const filterFilmsByGenre = (films: Films, genre: string):Films => (genre === ALL_GENRES ? films.slice() : films.filter((film) => (film.genre === genre)));

import {FilmDataProps} from '../types/film-data-type';
import { filmCardReviewsMocks } from './reviews';

export const filmDataMock: FilmDataProps = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  duration: '1h 39m',
  releaseYear: 2014,
  director: 'Wes Anderson',
  actors: [
    'Bill Murray',
    'Edward Norton',
    'Jude Law',
    'Willem Dafoe',
    'Saoirse Ronan',
    'Tony Revoloru',
    'Tilda Swinton',
    'Tom Wilkinson',
    'Owen Wilkinson',
    'Adrien Brody',
    'Ralph Fiennes',
    'Jeff Goldblum',
  ],
  description: [
    'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
    'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
  ],
  score: 8.9,
  rating: 'Very good',
  ratingCount: 240,
  logoImageUrl: 'img/the-grand-budapest-hotel.jpg',
  posterImageUrl: 'img/the-grand-budapest-hotel-poster.jpg',
  backgroundImageUrl: 'img/bg-the-grand-budapest-hotel.jpg',
  filmPageUrl: 'film-page.html',
  reviews: filmCardReviewsMocks,
};

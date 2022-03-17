import { Comments } from './commentary';

export type FilmData = {
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  id: number;
  videoLink: string;
  previewVideoLink: string;
  isFavorite: boolean;
};

export type Films = FilmData[];

export type FilmFullData =  {
  id: number;
  data: FilmData;
  comments: Comments;
  similar: Films;
}

export type FilmComments =  {
  id: number;
  comments: Comments;
}

export type FilmsFull = {
  [index: number]: FilmFullData;
};

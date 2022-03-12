export type FilmDataType = {
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

export type Films = FilmDataType[];

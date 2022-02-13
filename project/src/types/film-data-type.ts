import { FilmReviewProps } from './film-reviews-type';

export type FilmDataProps = {
    title: string;
    genre: string;
    duration: string;
    releaseYear: number;
    director: string;
    actors: string[];
    description: string[];
    score: number;
    rating: string;
    ratingCount: number;
    logoImageUrl: string;
    posterImageUrl: string;
    backgroundImageUrl: string;
    filmPageUrl: string;
    reviews: FilmReviewProps[];
  };

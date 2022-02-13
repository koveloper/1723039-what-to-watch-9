import dayjs from 'dayjs';
import {FilmReviewProps} from '../types/film-reviews-type';

export const filmCardReviewsMocks: FilmReviewProps[] = [
  {
    content: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
    reviewerName: 'Kate Muir',
    date: dayjs('2016-12-24', 'YYYY-MM-DD').toDate(),
    raiting: 8.9,
  },
  {
    content: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    reviewerName: 'Bill Goodykoontz',
    date: dayjs('2015-11-18', 'YYYY-MM-DD').toDate(),
    raiting: 8.0,
  },
  {
    content: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
    reviewerName: 'Amanda Greever',
    date: dayjs('2015-11-18', 'YYYY-MM-DD').toDate(),
    raiting: 8.0,
  },
  {
    content: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    reviewerName: 'Matthew Lickona',
    date: dayjs('2016-12-20', 'YYYY-MM-DD').toDate(),
    raiting: 7.2,
  },
  {
    content: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    reviewerName: 'Paula Fleri-Soler',
    date: dayjs('2016-12-20', 'YYYY-MM-DD').toDate(),
    raiting: 7.6,
  },
  {
    content: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    reviewerName: 'Paula Fleri-Soler',
    date: dayjs('2016-12-20', 'YYYY-MM-DD').toDate(),
    raiting: 7.0,
  },
];

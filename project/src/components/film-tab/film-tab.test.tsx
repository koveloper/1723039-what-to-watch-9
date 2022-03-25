import {render, screen} from '@testing-library/react';
import { FilmInfoType } from '../../utils/constants';
import { createFakeComments, createFakeFilmData } from '../../utils/mocks';
import FilmTab from './film-tab';

describe('Component: FilmTab', () => {
  const comments = createFakeComments();
  const filmData = createFakeFilmData();
  it('should render correctly when tab is FilmInfoType.Overview', () => {
    render(
      <FilmTab comments={comments} film={filmData} tab={FilmInfoType.Overview}/>,
    );
    //check elements on screen
    expect(screen.getByText(`Director: ${filmData.director}`)).toBeInTheDocument();
    expect(screen.getByText(filmData.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(`${filmData.scoresCount} ratings`)).toBeInTheDocument();
  });
  it('should render correctly when tab is FilmInfoType.Details', () => {
    render(
      <FilmTab comments={comments} film={filmData} tab={FilmInfoType.Details}/>,
    );
    //check elements on screen
    expect(screen.getByText(filmData.director)).toBeInTheDocument();
    expect(screen.getByText(filmData.genre)).toBeInTheDocument();
    expect(screen.getByText(filmData.released.toString())).toBeInTheDocument();
  });
  it('should render correctly when tab is FilmInfoType.Reviews', () => {
    render(
      <FilmTab comments={comments} film={filmData} tab={FilmInfoType.Reviews}/>,
    );
    //check elements on screen
    for(const comment of comments) {
      expect(screen.getByText(comment.comment)).toBeInTheDocument();
      expect(screen.getByText(comment.user.name)).toBeInTheDocument();
      expect(screen.queryAllByText(comment.rating.toString()).length).not.toBe(0);
    }
  });
});

import {act, fireEvent, render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { createFakeFilmData } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import Player from './player';

describe('Component: Player', () => {
  //   const mockedOnCanPlay = jest.fn();
  const film = createFakeFilmData();
  //   HTMLMediaElement.prototype.oncanplay = mockedOnCanPlay;

  it('should render component + spinner correctly while video is not ready', () => {
    render(
      <BrowserRouter>
        <Player title={film.name} videoLink={film.videoLink}/>
      </BrowserRouter>,
    );
    //check video elements on screen
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(3);
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('player-root')).toBeInTheDocument();
    //check spinner on screen
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
    //fire canplay event and check that spinner is removed
    fireEvent(screen.getByTestId('video') as Element, new Event('canplay'));
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Please wait...')).not.toBeInTheDocument();
  });

  it('should render component only', () => {
    const mockedPause = jest.fn();
    const mockedPlay = jest.fn();
    HTMLMediaElement.prototype.pause = mockedPause;
    HTMLMediaElement.prototype.play = mockedPlay;
    render(
      <BrowserRouter>
        <Player title={film.name} videoLink={film.videoLink}/>
      </BrowserRouter>,
    );
    //check video elements on screen
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(3);
    //check spinner on screen
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('should call video play/pause on play button click', () => {
    const mockedPause = jest.fn();
    const mockedPlay = jest.fn();
    HTMLMediaElement.prototype.pause = mockedPause;
    HTMLMediaElement.prototype.play = mockedPlay;

    render(
      <BrowserRouter>
        <Player title={film.name} videoLink={film.videoLink}/>
      </BrowserRouter>,
    );
    //check no pause and no play actions
    expect(mockedPause.mock.calls.length).toBe(0);
    expect(mockedPlay.mock.calls.length).toBe(0);
    //click play button and check pause command
    userEvent.click(screen.getAllByRole('button')[1]);
    // wait for effect in component
    act(() => {
      (() => void 0)();
    });
    expect(mockedPlay.mock.calls.length).toBe(0);
    expect(mockedPause.mock.calls.length).toBe(1);
    //click play button and check play command
    userEvent.click(screen.getAllByRole('button')[1]);
    // wait for effect in component
    act(() => {
      (() => void 0)();
    });
    expect(mockedPause.mock.calls.length).toBe(1);
    expect(mockedPlay.mock.calls.length).toBe(1);
  });

  it('should call container.requestFullMode on button click', () => {
    const mockedEnterFullScreen = jest.fn();

    render(
      <BrowserRouter>
        <Player title={film.name} videoLink={film.videoLink}/>
      </BrowserRouter>,
    );
    screen.getByTestId('player-root').requestFullscreen = mockedEnterFullScreen;

    //check no pause and no play actions
    expect(mockedEnterFullScreen.mock.calls.length).toBe(0);
    //click play button and check enter fullscreen
    userEvent.click(screen.getAllByRole('button')[2]);
    // wait for effect in component
    act(() => {
      (() => void 0)();
    });
    expect(mockedEnterFullScreen.mock.calls.length).toBe(1);
  });
  it('should go previous page on Back button click', () => {
    const history:History = createMemoryHistory();
    history.push('/page-1');
    history.push('/page-2');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path='page-1' element={<div>page-1-div</div>} />
          <Route path='page-2' element={<Player title={film.name} videoLink={film.videoLink}/>} />
          <Route path='*' element={<div>404-err-page</div>} />
        </Routes>
      </HistoryRouter>,
    );
    //check video elements on screen
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(3);
    //check spinner on screen
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
    //fire canplay event and check that spinner is removed
    fireEvent(screen.getByTestId('video') as Element, new Event('canplay'));
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Please wait...')).not.toBeInTheDocument();
    // const mockedEnterFullScreen = jest.fn();
    expect(screen.getAllByRole('button')[0].textContent).toBe('Exit');
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('page-1-div')).toBeInTheDocument();
  });
});

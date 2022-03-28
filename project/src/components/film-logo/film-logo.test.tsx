import {fireEvent, render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { createFakeFilmData } from '../../utils/mocks';
import { AppRoute } from '../../utils/constants';
import userEvent from '@testing-library/user-event';
import FilmLogo from './film-logo';
import { act } from 'react-dom/test-utils';

describe('Component: FilmLogo', () => {
  const fakeFilm = createFakeFilmData();
  it('should render correctly', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    render(
      <BrowserRouter>
        <FilmLogo film={fakeFilm} muted={false}/>
      </BrowserRouter>,
    );
    //check that links count is equal to genres count
    expect(screen.getByRole('link')).toBeInTheDocument();
    //check all genres names on screen
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });

  it('should redirect to film page', () => {
    HTMLMediaElement.prototype.pause = jest.fn;
    const history:History = createMemoryHistory();
    history.push('/fake-page');
    const fakeFilmUri = `/${AppRoute.Films}/${fakeFilm.id}`;
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={fakeFilmUri}
            element={<h1>This is fake film page</h1>}
          />
          <Route
            path="*"
            element={<FilmLogo film={fakeFilm} muted={false}/>}
          />
        </Routes>
      </HistoryRouter>,
    );
    //test for redirect to film page on click
    expect(screen.queryByText(/This is fake film page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is fake film page/i)).toBeInTheDocument();
  });
  it('should play video on hover event', async () => {
    const pauseMock = jest.fn();
    const playMock = jest.fn();
    HTMLMediaElement.prototype.pause = pauseMock;
    HTMLMediaElement.prototype.play = playMock;
    render(
      <BrowserRouter>
        <FilmLogo film={fakeFilm} muted={false}/>
      </BrowserRouter>,
    );
    // await new Promise((r) => setTimeout(r, 1000));
    fireEvent(screen.getByTestId('film-logo'), new Event('mouseenter'));
    act(() => {
      void 0;
    });
    // await new Promise((r) => setTimeout(r, 2000));
    // jest.useFakeTimers();
    // jest.runAllTimers();
    await new Promise((r) => setTimeout(() => {console.log('test'); r(void 0);}, 3000));

    act(() => {
      (() => void 0)();
    });
    expect(HTMLMediaElement.prototype.play).toBeCalled();

    //check that links count is equal to genres count
    // expect(screen.getByRole('link')).toBeInTheDocument();
    //check all genres names on screen
    // expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });

});

// import {fireEvent, render, screen} from '@testing-library/react';
// import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
// import { createMemoryHistory, History } from 'history';
// import { createFakeFilmData } from '../../utils/mocks';
// import { AppRoute } from '../../utils/constants';
// import userEvent from '@testing-library/user-event';
// import FilmLogo from './film-logo';
// import { act } from 'react-dom/test-utils';

// describe('Component: FilmLogo', () => {
//   const fakeFilm = createFakeFilmData();
//   it('should render correctly', () => {
//     HTMLMediaElement.prototype.pause = jest.fn;
//     render(
//       <BrowserRouter>
//         <FilmLogo film={fakeFilm} muted={false}/>
//       </BrowserRouter>,
//     );
//     //check that links count is equal to genres count
//     expect(screen.getByRole('link')).toBeInTheDocument();
//     //check all genres names on screen
//     expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
//   });

//   it('should redirect to film page', () => {
//     HTMLMediaElement.prototype.pause = jest.fn;
//     const history:History = createMemoryHistory();
//     history.push('/fake-page');
//     const fakeFilmUri = `/${AppRoute.Films}/${fakeFilm.id}`;
//     render(
//       <HistoryRouter history={history}>
//         <Routes>
//           <Route
//             path={fakeFilmUri}
//             element={<h1>This is fake film page</h1>}
//           />
//           <Route
//             path="*"
//             element={<FilmLogo film={fakeFilm} muted={false}/>}
//           />
//         </Routes>
//       </HistoryRouter>,
//     );
//     //test for redirect to film page on click
//     expect(screen.queryByText(/This is fake film page/i)).not.toBeInTheDocument();
//     userEvent.click(screen.getByRole('link'));
//     expect(screen.getByText(/This is fake film page/i)).toBeInTheDocument();
//   });
//   it('should play video on hover event', async () => {
//     const pauseMock = jest.fn();
//     const playMock = jest.fn();
//     HTMLMediaElement.prototype.pause = pauseMock;
//     HTMLMediaElement.prototype.play = playMock;
//     render(
//       <BrowserRouter>
//         <FilmLogo film={fakeFilm} muted={false}/>
//       </BrowserRouter>,
//     );
//     // act(() => {
//     //   void 0;
//     // });
//     // await new Promise((r) => setTimeout(r, 1000));
//     fireEvent(screen.getByTestId('film-logo'), new Event('mouseenter'));

//     // await new Promise((r) => setTimeout(r, 2000));
//     // jest.useFakeTimers();
//     // jest.runAllTimers();
//     await new Promise((r) => setTimeout(() => {console.log('test'); r(void 0);}, 3000));
//     //check that links count is equal to genres count
//     expect(screen.getByRole('link')).toBeInTheDocument();
//     expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
//     expect(HTMLMediaElement.prototype.play).toBeCalled();

//     //check that links count is equal to genres count
//     // expect(screen.getByRole('link')).toBeInTheDocument();
//     //check all genres names on screen
//     // expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
//   });

// });


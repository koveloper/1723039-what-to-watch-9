import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { renderHook } from '@testing-library/react-hooks';
import { useFilmIdFromUrl } from './use-film-id-from-url';
import { AppRoute } from '../utils/constants';

describe('Hook: useFilmIdFromUrl', () => {
  it('should correctly calculate id from films and player url', () => {
    for(const baseUrl of ['films', 'player']) {
      for(let i = 0; i < 100; i++) {
        const history:History = createMemoryHistory();
        const id = Math.floor(Math.random() * 1000);
        history.push(`/${baseUrl}/${id}`);
        const {result} = renderHook(
          () => useFilmIdFromUrl(),
          {
            wrapper: ({ children }) => (
              <HistoryRouter history={history}>
                <Routes>
                  <Route path={AppRoute.Film} element={children}/>
                  <Route path={AppRoute.Player} element={children}/>
                  <Route path='*' element={<div>err-404</div>}/>
                </Routes>
              </HistoryRouter>
            ),
          },
        );
        const value = result.current;
        expect(value).toBe(id);
      }
    }
  });
});

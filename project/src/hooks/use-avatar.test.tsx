import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { useAvatar } from './use-avatar';

describe('Hook: useAvatar', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = {
    user: {
      authStatus: AuthStatus.Unknown,
      userData: null,
      favoriteFilmsIdList: null,
    },
    films: {
      all: null,
      promoFilm: null,
      fullDataFilms: {},
    },
    service: {
      redirect: null,
    },
  };

  it('should return empty string on no user data', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => useAvatar(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe('');
  });

  it('should return avatar string in common mode', async () => {
    const fakeAvatarUrl = 'fake-avatar-url';
    const store = mockStore(Object.assign(
      initialState,
      {
        user: {
          userData: {
            avatarUrl: fakeAvatarUrl,
          },
        },
      },
    ));
    const {result} = renderHook(
      () => useAvatar(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const value = result.current;
    expect(value).toBe(fakeAvatarUrl);
  });
});

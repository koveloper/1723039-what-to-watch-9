import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { State } from '../store/types';
import { createInitialState } from '../utils/mocks';
import { useAvatar } from './use-avatar';

describe('Hook: useAvatar', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

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

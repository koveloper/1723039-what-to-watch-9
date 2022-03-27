import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';
import { BrowserRouter } from 'react-router-dom';
import { setRedirect } from '../store/service-process/service-process';
import { useRedirect } from './use-redirect';
import { createInitialState } from '../utils/mocks';

describe('Hook: useRedirect', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

  it('should return function and add setRedirect action to store', async () => {
    const store = mockStore(Object.assign(initialState, {user: {authStatus: AuthStatus.Unknown}}));
    const fakeRedirectTo = '/fake/redirect/to';
    const {result} = renderHook(
      () => useRedirect(),
      {
        wrapper: ({ children }) => (
          <Provider store={store} >
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </Provider>
        ),
      },
    );
    //check hook returns function
    const redirect = result.current;
    expect(redirect).toBeInstanceOf(Function);
    //check - there is no actions in store
    expect(store.getActions()).toEqual([]);
    //call hook
    redirect(fakeRedirectTo);
    //check actions in queue after hook invoke
    expect(store.getActions().length).toBe(1);
    const redirectAction = store.getActions().find(({type}) => type === setRedirect.toString());
    expect(redirectAction).not.toBe(undefined);
    //check action payload
    expect(redirectAction && ('payload' in redirectAction) && redirectAction['payload']).toBe(fakeRedirectTo);
  });
});

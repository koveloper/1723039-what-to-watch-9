import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { setAppError } from '../store/service-process/service-process';
import { AppErrorType, State } from '../store/types';
import { AppError } from '../utils/constants';
import { createFakeParagraph, createInitialState } from '../utils/mocks';
import { useAppError } from './use-app-error';

describe('Hook: useAppError', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

  it('should return null and setup callback on startup', async () => {
    const store = mockStore(initialState);
    const {result} = renderHook(
      () => useAppError(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const [value, func] = result.current;
    expect(value).toBe(null);
    expect(func).toBeInstanceOf(Function);
  });

  it('should return error in case of any data in store', async () => {
    const error = {
      type: AppError.PostReview,
      message: createFakeParagraph(),
    } as AppErrorType;
    const store = mockStore(Object.assign(
      initialState,
      {
        service: {
          error,
        },
      },
    ));
    const {result} = renderHook(
      () => useAppError(),
      {
        wrapper: ({ children }) => (<Provider store={store}>{children}</Provider>),
      },
    );
    const [value, func] = result.current;
    expect(value).toBeInstanceOf(Object);
    expect(value).toStrictEqual(error);
    act(() => func(null));
    expect(store.getActions().length).toBe(1);
    const setAppErr = store.getActions().find(({type}) => type === setAppError.toString());
    expect(setAppErr).not.toBe(undefined);
    expect(setAppErr && ('payload' in setAppErr) && setAppErr['payload']).toBe(null);
  });
});

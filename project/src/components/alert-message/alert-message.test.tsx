import AlertMessage from './alert-message';
import { render, screen} from '@testing-library/react';
import { createInitialState } from '../../utils/mocks';
import { AppError } from '../../utils/constants';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ServiceState, State } from '../../store/types';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('Component: AlertMessage', () => {
  const mockStore = configureMockStore<State, Action>();
  const initialState:State = createInitialState();

  it('should not render on NO error', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <AlertMessage />
      </Provider>,
    );
    //check that links count is equal to genres count
    expect(screen.queryByTestId('alert-message')).not.toBeInTheDocument();
  });

  it('should render on error exists', () => {
    const store = mockStore(Object.assign(
      initialState,
      {
        service: {
          redirect: null,
          error: {
            type: AppError.PostReview,
            message: 'fake-error-text',
          },
        } as ServiceState,
      },
    ));
    render(
      <Provider store={store}>
        <AlertMessage />
      </Provider>,
    );
    //check that links count is equal to genres count
    expect(screen.getByTestId('alert-message')).toBeInTheDocument();
    expect(screen.getByText('fake-error-text')).toBeInTheDocument();
  });
});

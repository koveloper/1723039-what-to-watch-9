import fakerStatic from 'faker';
import { AppError } from '../../utils/constants';
import { createFakeParagraph } from '../../utils/mocks';
import { AppErrorType, ServiceState } from '../types';
import { serviceProcess, setAppError, setRedirect } from './service-process';


describe('Reducer: serviceProcess', () => {
  it('check for initial state on any non data call', () => {
    expect(serviceProcess.reducer(void 0, {type: 'some dummy action'}))
      .toEqual({redirect: null, error: null});
  });
  it('should contains redirect data on redirectAction and app error on AppError', () => {
    const state:ServiceState = {redirect: null, error: null};
    const redirectTo = fakerStatic.internet.url();
    const error:AppErrorType = {
      type: AppError.PostReview,
      message: createFakeParagraph(),
    };
    expect(serviceProcess.reducer(state, setRedirect(redirectTo)))
      .toEqual({redirect: redirectTo, error: null});
    expect(serviceProcess.reducer(state, setAppError(error)))
      .toEqual({redirect: null, error});
  });
});

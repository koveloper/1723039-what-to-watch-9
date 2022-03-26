import fakerStatic from 'faker';
import { serviceProcess, setRedirect } from './service-process';


describe('Reducer: serviceProcess', () => {
  it('check for initial state on any non data call', () => {
    expect(serviceProcess.reducer(void 0, {type: 'some dummy action'}))
      .toEqual({redirect: null});
  });
  it('should contains redirect data on redirectAction', () => {
    const state = {redirect: null};
    const redirectTo = fakerStatic.internet.url();
    expect(serviceProcess.reducer(state, setRedirect(redirectTo)))
      .toEqual({redirect: redirectTo});
  });
});

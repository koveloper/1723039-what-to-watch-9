import { useSelector, useStore } from 'react-redux';
import { setAppError } from '../store/service-process/service-process';
import { AppErrorType, State } from '../store/types';

type SetAppError = (err: AppErrorType | null) => void;
//////////////////////////////////////////
export const useAppError = (): [AppErrorType | null, SetAppError] => {
  const {error} = useSelector((state: State) => state.service);
  const store = useStore();
  return [error, (err: AppErrorType | null) => {
    store.dispatch(setAppError(err));
  }];
};

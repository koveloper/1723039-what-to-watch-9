import { useSelector } from 'react-redux';
import { AuthStatus } from '../store/constants';
import { State } from '../store/types';

//////////////////////////////////////////
export const useAuth = (): boolean => {
  const {authStatus} = useSelector((state: State) => state.user);
  return authStatus === AuthStatus.Authorized;
};

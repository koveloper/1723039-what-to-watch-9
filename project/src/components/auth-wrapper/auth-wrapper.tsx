import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../store/constants';
import { State } from '../../store/types';

type AuthWrapperProps = {
    component: JSX.Element;
};

function AuthWrapper(props: AuthWrapperProps): JSX.Element {
  const authState = useSelector((state: State) => state.authStatus);
  return authState === AuthStatus.Authorized
    ? props.component
    : <Navigate to='/login'></Navigate>;
}

export default AuthWrapper;

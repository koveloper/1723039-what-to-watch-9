import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../store/constants';
import { State } from '../../store/types';

type AuthWrapperProps = {
    component: JSX.Element;
};

function AuthWrapper(props: AuthWrapperProps): JSX.Element {
  const {authStatus} = useSelector((state: State) => state.user);
  return authStatus === AuthStatus.Authorized
    ? props.component
    : <Navigate to='/login'></Navigate>;
}

export default AuthWrapper;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

type AuthWrapperProps = {
    component: JSX.Element;
};

function AuthWrapper(props: AuthWrapperProps): JSX.Element {
  const isAuthorized = useAuth();
  return isAuthorized
    ? props.component
    : <Navigate to='/login'></Navigate>;
}

export default AuthWrapper;

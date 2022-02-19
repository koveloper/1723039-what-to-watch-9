import { Navigate } from 'react-router-dom';

type AuthWrapperProps = {
    isLoggedIn: boolean;
    component: JSX.Element;
};

function AuthWrapper(props: AuthWrapperProps): JSX.Element {
  return props.isLoggedIn
    ? props.component
    : <Navigate to='/login'></Navigate>;
}

export default AuthWrapper;

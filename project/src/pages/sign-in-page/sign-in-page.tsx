// import { api } from '../../api/api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';
import { AuthStatus } from '../../store/constants';
import { State } from '../../store/types';
import { LoginData } from '../../types/login-data';
import { AppRoute } from '../../utils/constants';

type SignInPageProps = {
  message?: string;
  isError?: boolean;
}

function SignInPage({message, isError}: SignInPageProps): JSX.Element {
  const onSubmitHandler = (props: LoginData) => {
    api.login(props);
  };
  const authStatus = useSelector((state: State) => state.authStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if(authStatus === AuthStatus.Authorized) {
      navigate(AppRoute.Root);
    }
  }, [authStatus]);
  return (
    <UserPageLayout title='Sign in' hideUserBlock>
      <div className="sign-in user-page__content">
        <SignInForm onSubmit={onSubmitHandler} message={message} isError={isError} />
      </div>
    </UserPageLayout>
  );
}

export default SignInPage;

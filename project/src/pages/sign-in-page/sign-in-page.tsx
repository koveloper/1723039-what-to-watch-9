import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { AuthStatus } from '../../store/constants';
import { State } from '../../store/types';
import { LoginData } from '../../types/login-data';
import { AppRoute } from '../../utils/constants';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';
import { useAuth } from '../../hooks';

type SignInPageProps = {
  message?: string;
  isError?: boolean;
}

export default function SignInPage({message, isError}: SignInPageProps): JSX.Element {
  const isAuthorized = useAuth();
  const navigate = useNavigate();
  const onSubmitHandler = (props: LoginData) => {
    api.login(props);
  };
  useEffect(() => {
    if(isAuthorized) {
      navigate(AppRoute.Root);
    }
  }, [isAuthorized]);
  return (
    <UserPageLayout title='Sign in' hideUserBlock>
      <div className="sign-in user-page__content">
        <SignInForm onSubmit={onSubmitHandler} message={message} isError={isError} />
      </div>
    </UserPageLayout>
  );
}

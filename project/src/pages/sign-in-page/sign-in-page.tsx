import SignInForm from '../../components/sign-in-form/sign-in-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { api } from '../../api/api';
import { LoginData } from '../../types/login-data';
import { AppRoute } from '../../utils/constants';
import { HeaderType } from '../../components/header/header-type';
import { useAuth } from '../../hooks/use-auth';
import { useRedirect } from '../../hooks/use-redirect';

type SignInPageProps = {
  message?: string;
  isError?: boolean;
}

export default function SignInPage({message, isError}: SignInPageProps): JSX.Element | null {
  const isAuthorized = useAuth();
  const redirect = useRedirect();
  const onSubmitHandler = (props: LoginData) => {
    api.login(props);
  };
  if(isAuthorized) {
    redirect(AppRoute.Root);
    return null;
  }
  return (
    <div className="user-page">
      <Header type={HeaderType.UserOrSignIn}>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>
      <div className="sign-in user-page__content">
        <SignInForm onSubmit={onSubmitHandler} message={message} isError={isError} />
      </div>
      <Footer />
    </div>
  );
}

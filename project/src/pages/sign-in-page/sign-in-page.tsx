import SignInForm from '../../components/sign-in-form/sign-in-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { api } from '../../api/api';
import { LoginData } from '../../types/login-data';
import { AppRoute } from '../../utils/constants';
import { HeaderType } from '../../utils/constants';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SignInPage(): JSX.Element | null {
  const isAuthorized = useAuth();
  const navigate = useNavigate();
  const [dataError, setDataError] = useState<string | undefined>(undefined);
  const handleSubmit = (args: LoginData) => {
    const regExpLetters = RegExp(/[A-Za-z]+/g);
    const regExpDigits = RegExp(/[0-9]+/g);

    if(!regExpLetters.test(args.password) || !regExpDigits.test(args.password)) {
      setDataError('Password must contains at least one letter and at least one digit');
      return;
    }
    api.login(args);
  };
  useEffect(() => {
    if(isAuthorized) {
      navigate(AppRoute.Root);
    }
  }, [isAuthorized]);
  return (
    <div className="user-page">
      <Header type={HeaderType.UserOrSignIn}>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>
      <div className="sign-in user-page__content">
        <SignInForm onSubmit={handleSubmit} message={dataError} isError={!!dataError} />
      </div>
      <Footer />
    </div>
  );
}

import Footer from '../footer/footer';
import Logo from '../logo/logo';
import SignInForm from '../sign-in-form/sign-in-form';

function SignInPage({message, isError}: {message?: string, isError?: boolean}): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLight={false}/>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <SignInForm message={message} isError={isError} />
      </div>
      <Footer />
    </div>
  );
}

export default SignInPage;

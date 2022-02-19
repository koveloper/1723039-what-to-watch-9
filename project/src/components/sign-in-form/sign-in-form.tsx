import ErrorMessage from './error-message';
import SignInField from './sign-in-field';

function SignInForm({message, isError}: {message?: string, isError?: boolean}): JSX.Element {
  return (
    <form action="#" className="sign-in__form">
      {message ? <ErrorMessage>{message}</ErrorMessage> : null}
      <div className="sign-in__fields">
        <SignInField type='email' id='user-email' label='Email address' isError={!!(message && isError)} />
        <SignInField type='password' id='user-password' label='Password' isError={!!(message && isError)} />
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}

export default SignInForm;

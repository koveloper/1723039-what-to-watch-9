import ErrorMessage from './error-message';
import SignInField from './sign-in-field';

type SignInFormProps = {
  message?: string;
  isError?: boolean;
}

function SignInForm({message, isError}: SignInFormProps): JSX.Element {
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

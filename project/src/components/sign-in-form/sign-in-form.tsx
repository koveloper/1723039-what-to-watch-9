import { FormEvent, useRef} from 'react';
import { LoginData } from '../../types/login-data';
import ErrorMessage from './error-message';

type SignInFormProps = {
  message?: string;
  isError?: boolean;
  onSubmit: (props: LoginData) => void;
}

export default function SignInForm({message, isError, onSubmit}: SignInFormProps): JSX.Element {
  const emailElement = useRef<HTMLInputElement | null>(null);
  const pwdElement = useRef<HTMLInputElement | null>(null);
  const onSubminHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(!emailElement.current || !pwdElement.current) {
      return;
    }
    onSubmit({
      login: emailElement.current.value,
      password: pwdElement.current.value,
    });
  };
  const isErrorShown = !!(message && isError);
  const classes = isErrorShown ? 'sign-in__field sign-in__field--error' : 'sign-in__field';
  return (
    <form onSubmit={onSubminHandler} className="sign-in__form">
      {message ? <ErrorMessage>{message}</ErrorMessage> : null}
      <div className="sign-in__fields">
        <div className={classes}>
          <input
            ref={emailElement}
            className="sign-in__input"
            type='email'
            placeholder='Email address'
            name='user-email'
            id='user-email'
          />
          <label className="sign-in__label visually-hidden" htmlFor='user-email'>Email address</label>
        </div>
        <div className={classes}>
          <input
            ref={pwdElement}
            className="sign-in__input"
            type='password'
            placeholder='Password'
            name='user-password'
            id='user-password'
          />
          <label className="sign-in__label visually-hidden" htmlFor='user-password'>Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}


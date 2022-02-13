const getMessageElement = (msg?: string): JSX.Element | null => (msg ? (
  <div className="sign-in__message">
    <p>{msg}</p>
  </div>
): null);

function SignInForm({message, isError}: {message?: string, isError?: boolean}): JSX.Element {
  return (
    <form action="#" className="sign-in__form">
      {getMessageElement(message)}
      <div className="sign-in__fields">
        <div className={message && isError ? 'sign-in__field sign-in__field--error' : 'sign-in__field'}>
          <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}

export default SignInForm;

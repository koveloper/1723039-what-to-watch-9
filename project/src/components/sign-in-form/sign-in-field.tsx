type SignInFieldProps = {
    type: 'password' | 'email' | 'text';
    id: string;
    name?: string;
    placeholder?: string;
    label: string;
    isError?: boolean;
};

function SignInField(props: SignInFieldProps): JSX.Element {
  return (
    <div className={props.isError ? 'sign-in__field sign-in__field--error' : 'sign-in__field'}>
      <input
        className="sign-in__input"
        type={props.type}
        placeholder={props.placeholder || props.label}
        name={props.name || props.id}
        id={props.id}
      />
      <label className="sign-in__label visually-hidden" htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default SignInField;

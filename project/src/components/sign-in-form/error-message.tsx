import { PropsWithChildren } from 'react';

type ErrorMessageProps = {
    message?: string;
}

export default function ErrorMessage(props: PropsWithChildren<ErrorMessageProps>): JSX.Element {
  return (
    <div className="sign-in__message">
      {props.message || props.children}
    </div>
  );
}

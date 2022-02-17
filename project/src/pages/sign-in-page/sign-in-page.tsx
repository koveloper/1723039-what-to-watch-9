import SignInForm from '../../components/sign-in-form/sign-in-form';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';

function SignInPage({message, isError}: {message?: string, isError?: boolean}): JSX.Element {
  return (
    <UserPageLayout>
      <div className="sign-in user-page__content">
        <SignInForm message={message} isError={isError} />
      </div>
    </UserPageLayout>
  );
}

export default SignInPage;

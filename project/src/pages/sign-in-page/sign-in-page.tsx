import SignInForm from '../../components/sign-in-form/sign-in-form';
import UserPageLayout from '../../layouts/user-page-layout/user-page-layout';

type SignInPageProps = {
  message?: string;
  isError?: boolean;
}

function SignInPage({message, isError}: SignInPageProps): JSX.Element {
  return (
    <UserPageLayout title='Sign in' hideUserBlock>
      <div className="sign-in user-page__content">
        <SignInForm message={message} isError={isError} />
      </div>
    </UserPageLayout>
  );
}

export default SignInPage;

import { api } from '../../api/api';
import { useAuth } from '../../hooks/use-auth';
import { useRedirect } from '../../hooks/use-redirect';
import { AppRoute } from '../../utils/constants';
import Spinner from '../../components/spinner/spinner';

export default function LogoutPage(): JSX.Element {
  const isAuthorized = useAuth();
  const redirect = useRedirect();
  if(isAuthorized) {
    api.logout();
  } else {
    redirect(AppRoute.Root);
  }
  return <Spinner />;
}

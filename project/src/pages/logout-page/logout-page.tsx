import { api } from '../../api/api';
import { useAuth } from '../../hooks/use-auth';
import { AppRoute } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../../components/spinner/spinner';

export default function LogoutPage(): JSX.Element {
  const isAuthorized = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(isAuthorized) {
      api.logout();
    } else {
      navigate(AppRoute.Root);
    }
  }, [isAuthorized]);
  return <Spinner />;
}

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthStatus } from '../../store/constants';
import { State } from '../../store/types';
import { AppRoute } from '../../utils/constants';
import UserInfo from './user-info';

function UserBlock(): JSX.Element {
  const {authStatus} = useSelector((state: State) => state.user);
  return (
    <ul className="user-block">
      {authStatus === AuthStatus.Authorized
        ? <UserInfo />
        : <Link className='user-block__link' to={AppRoute.SignIn}>Sign in</Link>}
    </ul>
  );
}

export default UserBlock;

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useAvatar } from '../../hooks';
import { AppRoute } from '../../utils/constants';
import UserInfo from './user-info';

function UserBlock(): JSX.Element {
  const isAuthorized = useAuth();
  const avatar = useAvatar();
  return (
    <ul className="user-block">
      {isAuthorized
        ? <UserInfo avatar={avatar}/>
        : <Link className='user-block__link' to={AppRoute.SignIn}>Sign in</Link>}
    </ul>
  );
}

export default memo(UserBlock);

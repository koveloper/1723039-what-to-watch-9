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
        ?
        (
          <>
            <li onClick={() => navigate(AppRoute.User)} className="user-block__item">
              <div className="user-block__avatar">
                <img src={props.avatar} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to={getBlankLink()}>Sign out</Link>
            </li>
          </>
        )
        : <Link className='user-block__link' to={AppRoute.SignIn}>Sign in</Link>}
    </ul>
  );
}

export default memo(UserBlock);

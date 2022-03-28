import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { useAvatar } from '../../hooks/use-avatar';
import { AppRoute } from '../../utils/constants';

function UserBlock(): JSX.Element {
  const isAuthorized = useAuth();
  const avatar = useAvatar();
  const navigate = useNavigate();

  return (
    <ul data-testid="user-block" className="user-block">
      {isAuthorized
        ?
        (
          <>
            <li onClick={() => navigate(AppRoute.User)} className="user-block__item">
              <div className="user-block__avatar">
                <img src={avatar} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.SignOut}>Sign out</Link>
            </li>
          </>
        )
        : <Link className='user-block__link' to={AppRoute.SignIn}>Sign in</Link>}
    </ul>
  );
}

export default memo(UserBlock);

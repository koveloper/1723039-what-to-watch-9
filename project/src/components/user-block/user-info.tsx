import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { getBlankLink } from '../../utils/logic-utils';

type UserInfoProps = {
  avatar: string;
}

function UserInfo(props: UserInfoProps):JSX.Element {
  const navigate = useNavigate();
  return (
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
  );
}

export default memo(UserInfo);

import { Link } from 'react-router-dom';
import { getBlankLink } from '../../utils/logic-utils';

function UserInfo():JSX.Element {
  return (
    <>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" to={getBlankLink()}>Sign out</Link>
      </li>
    </>
  );
}

export default UserInfo;

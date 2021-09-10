import './HeaderInfo.scss';

import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setFileUsers } from '../../store/actions'
import userJSON from '../../dummy_data/users.json'

function HeaderInfo() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.username);

  const signOut = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(setFileUsers(userJSON));
  },[dispatch]);

  return (
      <div className="header-info">
        {username ? <span className="username">{username}</span> : null}
        {username ? 
          <button className="sign" onClick={signOut}>Sign Out</button> :
          <Link className="sign" to="/SignIn">Sign In / Sing Up</Link>
        }
      </div>
  );
}

export default HeaderInfo;
import './HeaderInfo.scss';

import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setFileUsers } from '../../store/actions'
import userJSON from '../../dummy_data/users.json'

const getUsername = (state) => state.users.username;

function HeaderInfo() {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);

  const signOut = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(setFileUsers(userJSON));
  },[dispatch]);

  return ( 
    <div className="header-info">
      <span className="username">{username}</span>
      {username ? 
        <button className="sign" onClick={signOut}>Sign Out</button> :
        <Link className="sign" to="/SignIn">Sign In</Link>
      }
    </div>
  );
}

export default HeaderInfo;
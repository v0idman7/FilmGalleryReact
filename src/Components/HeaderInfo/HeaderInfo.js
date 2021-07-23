import './HeaderInfo.scss';

import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setFileUsers } from '../../store/actions'
import userJSON from '../../dummy_data/users.json'

function HeaderInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.username);
  const [display, setDisplay] = useState(true);

  const signOut = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(setFileUsers(userJSON));
  },[dispatch]);

  useEffect(() => {
    setDisplay(history.location.pathname !== '/SignIn' && history.location.pathname !== '/SignUp');
  },[history.location.pathname]);

  return ( 
    display ?
      <div className="header-info">
        {username ? <span className="username">{username}</span> : null}
        {username ? 
          <button className="sign" onClick={signOut}>Sign Out</button> :
          <Link className="sign" to="/SignIn">Sign In / Sing Up</Link>
        }
      </div>
    : null
  );
}

export default HeaderInfo;
import './Header.scss';

import { useLocation } from 'react-router-dom'
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import SvgLink from '../SvgLink/SvgLink';

function Header() {
  const location = useLocation();

  return ( 
    <header className="header">
      <SvgLink svg={'Home'} size={50} />
      { (location.pathname !== '/SignIn' && location.pathname !== '/SignUp') ? <HeaderInfo /> : null }
    </header>
  );
}

export default Header;
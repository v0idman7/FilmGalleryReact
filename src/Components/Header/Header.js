import HeaderInfo from '../HeaderInfo/HeaderInfo';
import SvgLink from '../SvgLink/SvgLink';
import './Header.scss';

function Header() {
  return ( 
    <header className="header">
      <SvgLink svg={'Home'} size={50}></SvgLink>
      <HeaderInfo></HeaderInfo>
    </header>
  );
}

export default Header;
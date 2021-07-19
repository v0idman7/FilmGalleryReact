/** @jsxImportSource @emotion/react */
import home from '../../images/design/Home.svg'
import del from '../../images/design/Delete.svg'
import plus from '../../images/design/Plus.svg'
import edit from '../../images/design/Edit.svg'

import './SvgLink.scss';

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

function SvgLink(props) {
  const { svg, size } =  props;
  const img = (svg) =>{
    switch (svg) {
      case 'Home': return home;
      case 'Delete': return del;
      case 'Delete1': return del;
      case 'Plus': return plus;
      case 'Edit': return edit;
      default: return null;
    }
  }
  const to = (svg) =>{
    switch (svg) {
      case 'Home': return '/';
      case 'Delete': return '/';
      case 'Delete1': return '/';
      case 'Plus': return '/Add';
      case 'Edit': return '/';
      default: return '/';
    }
  }
  const style = css`
    ${svg==='Delete' ? 'position: absolute; right: -25px; top: 10px;' : ''}
    ${svg==='Plus' ? 'position: absolute; left: 260px; top: 10px;' : ''}
    ${svg==='Edit' ? 'position: absolute; left: 360px; top: 70px;' : ''}
    ${svg==='Delete1' ? 'position: absolute; left: 360px; top: 10px;' : ''}
    width: ${size}px; 
    height: ${size}px; 
    background: url('${img(svg)}') center no-repeat;`;
  return ( 
    <Link className="svg-link" 
      to={to(svg)} 
      css={style}>
    </Link>
  );
}

export default SvgLink;
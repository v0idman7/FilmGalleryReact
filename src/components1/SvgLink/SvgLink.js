/** @jsxImportSource @emotion/react */

import './SvgLink.scss';

import { useDispatch } from 'react-redux';
import { css } from '@emotion/react'
import { Link, useHistory } from 'react-router-dom'
import { deleteFilm } from '../../store/actions';

import home from '../../asset/images/design/Home.svg'
import del from '../../asset/images/design/Delete.svg'
import plus from '../../asset/images/design/Plus.svg'
import edit from '../../asset/images/design/Edit.svg'

function SvgLink(props) {
  const { svg, size, id } =  props;
  const dispatch = useDispatch();
  const history = useHistory();

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
      case 'Edit': return `/Edit${id}`;
      default: return '/';
    }
  }
  const style = css`
    ${svg==='Delete' ? 'position: absolute; right: -25px; top: 10px; border: 0;' : ''}
    ${svg==='Plus' ? 'position: absolute; left: 260px; top: 10px;' : ''}
    ${svg==='Edit' ? 'position: absolute; left: 360px; top: 70px;' : ''}
    ${svg==='Delete1' ? 'position: absolute; left: 360px; top: 10px; border: 0;' : ''}
    width: ${size}px; 
    height: ${size}px; 
    background: url('${img(svg)}') center no-repeat;`;

  const handleClick = () => {
    dispatch(deleteFilm(id));
    if (svg === 'Delete1')
    history.push('/') ;
  }

  return ( 
    svg === 'Delete' || svg === 'Delete1' ?
    <button className="svg-link" css={style} onClick={handleClick}></button>
    :
    <Link className="svg-link" 
      to={to(svg)} 
      css={style} />
    
  );
}

export default SvgLink;
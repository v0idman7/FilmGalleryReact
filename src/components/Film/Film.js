import './Film.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SvgLink from '../SvgLink/SvgLink';
import defaultPoster from '../../asset/images/content/Poster.png'

function Film(props) {
  const isAdmin = useSelector((state) => state.users.isAdmin);
  const { id, poster, title, rating, release } = props;

  return ( 
    <div  className="filmList-item">
      {isAdmin ? <SvgLink svg="Delete" size="20" id={id} /> : null}
      <Link className="film-poster" to={'/Film' + id}>
        <img 
          className="film-poster" 
          src={poster !== null ? "https://image.tmdb.org/t/p/w500" + poster : defaultPoster}
          alt="Film Poster"
        />
      </Link>
      <div className="film-name">
        <span className="film-name-text">{title}</span>
      </div>
      <div className="film-info">
        <span className="film-rating">{rating}</span>
        <span className="film-release">{release}</span>
      </div>
    </div>
  );
}

export default Film;
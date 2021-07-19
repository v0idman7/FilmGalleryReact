import SvgLink from '../SvgLink/SvgLink';
import './Film.scss';
import defaultPoster from '../../images/content/Poster.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const getIsAdmin = (state) => state.users.isAdmin;

function Film(props) {
  const isAdmin = useSelector(getIsAdmin);
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
      <span className="film-name">{title}</span>
      <div className="film-info">
        <span className="film-rating">{rating}</span>
        <span className="film-release">{release}</span>
      </div>
    </div>
  );
}

export default Film;
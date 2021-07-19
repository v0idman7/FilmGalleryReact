import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFilmPage } from '../../Services';
import './FilmPage.scss';
import defaultPoster from '../../images/content/Poster.png';
import { useParams } from 'react-router-dom';
import SvgLink from '../SvgLink/SvgLink';
import Loader from '../Loader/Loader';

const getIsAdmin = (state) => state.users.isAdmin;
const getAdd = (state) => state.films.add;
const getEdit = (state) => state.films.edit;

function FilmPage(props) {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const isAdmin = useSelector(getIsAdmin);
  const addFilms = useSelector(getAdd);
  const editFilms = useSelector(getEdit);

  const checkID = (id, type) => {
    if (type === 'Add') {
      for(let i = 0; i < addFilms.length; i++){
        if (addFilms[i].id === id) {
          return i
        };
      }
      return false;
    } else if (type === 'Edit') {
      for(let j = 0; j < editFilms.length; j++){
        console.log(id, editFilms[j].id)
        if (String(editFilms[j].id) === id) {
          return j
        };
      }
      return false;
    }
  }

  const idFilmAdd = checkID(id, 'Add');
  const idFilmEdit = checkID(id, 'Edit');

  useEffect(() => {
    console.log(editFilms.length, idFilmEdit)
    if (editFilms.length !== 0 && idFilmEdit !== false) {
      console.log(editFilms[idFilmEdit])
      setFilm(editFilms[idFilmEdit]);
    }else if (addFilms.length !== 0 && idFilmAdd !== false) {
      setFilm(addFilms[idFilmAdd]);
    }else getFilmPage(id).then((result) => setFilm(result));
  },[id, addFilms, idFilmEdit, idFilmAdd, editFilms]);

  return (
    film !== null ? ( <section className="film">
      <img className="film__poster" src={film.poster_path !== null ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : defaultPoster} alt="Film poster"/>
      {isAdmin ? <SvgLink svg="Delete1" size={40}></SvgLink> : null}
      {isAdmin ? <SvgLink svg="Edit" size={40}></SvgLink> : null}
      <div className="film__info">
        <span className="film__name">{film.title}</span>
        <span className="film__rating">{film.vote_average}</span>
        <span className="film__release">{film.release_date}</span>
        {film.production_countries ? <span className="film__countries">{film.production_countries.map((item) => item.name).join(', ')}</span> : null}
        <span className="film__genres">{film.genres.map((item) => item.name).join(', ')}</span>
        {film.tagline ? <span className="film__slogan">{film.tagline}</span> : null}
        <p className="film__about">{film.overview}</p>
      </div>
    </section>) : <Loader></Loader>
  );
}

export default FilmPage;